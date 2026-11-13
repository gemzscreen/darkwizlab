/* ==========================================================
   DarkWiz Lab: version and revision history
   This file is the single source of truth. VERSION, CHANGELOG.md
   and the ?v= cache-busting tags are generated from it by
   scripts/version.mjs, and `node scripts/version.mjs check`
   fails if any of them disagree.

   New revision:
     1. node scripts/version.mjs bump X.Y.Z
     2. add the entry at the TOP of DWL_CHANGELOG below
     3. node scripts/version.mjs changelog
     4. node scripts/version.mjs check

   Numbering: patch (2.0.1) = fixes and wording
              minor (2.1.0) = a new app or section
              major (3.0.0) = a redesign
   ========================================================== */
window.DWL_VERSION = "2.0.0";

window.DWL_CHANGELOG = [
  {
    v: "2.0.0",
    date: "2026-11-13",
    title: "Project hub redesign",
    notes: [
      "Home page rebuilt as a drawing set, with a live beam figure that redraws its shear and moment diagrams.",
      "Free apps (BM Translator, Math Learning App) listed separately with links.",
      "Private tools listed in the drawing register by codename only, without links.",
      "Paper and model space views.",
      "Support, report and not-found pages restyled to match.",
      "Revision history added to the footer."
    ]
  },
  {
    v: "1.1.1",
    date: "2026-08-21",
    title: "Home page fixes",
    notes: [
      "Copy and layout fixes on the home page."
    ]
  },
  {
    v: "1.1.0",
    date: "2026-08-13",
    title: "Support and report pages",
    notes: [
      "Support page with GCash and Ko-fi.",
      "Report page for bugs and suggestions.",
      "Anonymous visit counts."
    ]
  },
  {
    v: "1.0.0",
    date: "2026-08-07",
    title: "First release",
    notes: [
      "darkwizlab.com goes live as the home page for the Math Learning App."
    ]
  }
];

/* Fill any element marked data-dwl-version with the current version. */
(function(){
  function fill(){
    var els = document.querySelectorAll('[data-dwl-version]');
    for (var i = 0; i < els.length; i++) els[i].textContent = window.DWL_VERSION;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);
  else fill();
})();
