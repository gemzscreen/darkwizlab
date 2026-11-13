#!/usr/bin/env node
/*
 * DarkWiz Lab versioning
 *
 *   node scripts/version.mjs show            print the current version
 *   node scripts/version.mjs bump X.Y.Z      set a new version everywhere
 *   node scripts/version.mjs changelog       regenerate CHANGELOG.md from version.js
 *   node scripts/version.mjs check           fail if anything disagrees
 *
 * version.js is the source of truth. This script keeps VERSION, CHANGELOG.md
 * and every `version.js?v=` tag in the HTML pages in step with it.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (f) => path.join(ROOT, f);
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

function load() {
  const src = fs.readFileSync(P('version.js'), 'utf8');
  const sandbox = { window: {}, document: { readyState: 'complete', querySelectorAll: () => [] } };
  vm.runInNewContext(src, sandbox, { filename: 'version.js' });
  const { DWL_VERSION: version, DWL_CHANGELOG: changelog } = sandbox.window;
  if (!SEMVER.test(version || '')) throw new Error(`version.js: DWL_VERSION "${version}" is not X.Y.Z`);
  if (!Array.isArray(changelog) || !changelog.length) throw new Error('version.js: DWL_CHANGELOG is empty');
  return { src, version, changelog };
}

function htmlPages() {
  return fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
}

function cmp(a, b) {
  const x = a.match(SEMVER).slice(1).map(Number), y = b.match(SEMVER).slice(1).map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
}

function renderChangelog(changelog) {
  let out = '# Changelog\n\nGenerated from `version.js` by `node scripts/version.mjs changelog`. Do not edit by hand.\n';
  for (const e of changelog) {
    out += `\n## ${e.v} (${e.date}): ${e.title}\n\n`;
    for (const n of e.notes) out += `- ${n}\n`;
  }
  return out;
}

const [cmd, arg] = process.argv.slice(2);

try {
  if (cmd === 'show' || !cmd) {
    console.log(load().version);

  } else if (cmd === 'bump') {
    if (!SEMVER.test(arg || '')) throw new Error('usage: bump X.Y.Z');
    const { src, version } = load();
    if (cmp(arg, version) <= 0) throw new Error(`${arg} must be higher than the current ${version}`);
    fs.writeFileSync(P('version.js'), src.replace(/window\.DWL_VERSION = "[^"]+";/, `window.DWL_VERSION = "${arg}";`));
    fs.writeFileSync(P('VERSION'), arg + '\n');
    for (const f of htmlPages()) {
      const t = fs.readFileSync(P(f), 'utf8');
      const u = t.replace(/version\.js\?v=[0-9.]+/g, `version.js?v=${arg}`);
      if (u !== t) fs.writeFileSync(P(f), u);
    }
    console.log(`Bumped ${version} -> ${arg}.`);
    console.log('Next: add the entry at the top of DWL_CHANGELOG in version.js, then run "changelog" and "check".');

  } else if (cmd === 'changelog') {
    const { changelog } = load();
    fs.writeFileSync(P('CHANGELOG.md'), renderChangelog(changelog));
    console.log('CHANGELOG.md written.');

  } else if (cmd === 'check') {
    const { version, changelog } = load();
    const errs = [];
    const fileVer = fs.existsSync(P('VERSION')) ? fs.readFileSync(P('VERSION'), 'utf8').trim() : '(missing)';
    if (fileVer !== version) errs.push(`VERSION is ${fileVer}, version.js is ${version}`);
    if (changelog[0].v !== version) errs.push(`newest changelog entry is ${changelog[0].v}, expected ${version}`);
    for (let i = 1; i < changelog.length; i++) {
      if (cmp(changelog[i - 1].v, changelog[i].v) <= 0) errs.push(`changelog out of order at ${changelog[i].v}`);
    }
    for (const e of changelog) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || '')) errs.push(`${e.v}: date "${e.date}" is not YYYY-MM-DD`);
      if (!e.title || !Array.isArray(e.notes) || !e.notes.length) errs.push(`${e.v}: needs a title and notes`);
    }
    const md = fs.existsSync(P('CHANGELOG.md')) ? fs.readFileSync(P('CHANGELOG.md'), 'utf8') : '';
    if (md !== renderChangelog(changelog)) errs.push('CHANGELOG.md is stale: run "node scripts/version.mjs changelog"');
    for (const f of htmlPages()) {
      const t = fs.readFileSync(P(f), 'utf8');
      for (const m of t.matchAll(/version\.js\?v=([0-9.]+)/g)) {
        if (m[1] !== version) errs.push(`${f} loads version.js?v=${m[1]}, expected ${version}`);
      }
    }
    if (errs.length) {
      console.error('Version check failed:\n  - ' + errs.join('\n  - '));
      process.exit(1);
    }
    console.log(`Version check passed: ${version}`);

  } else {
    throw new Error(`unknown command "${cmd}". Use show, bump, changelog or check.`);
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
