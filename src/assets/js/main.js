"use strict";

let navigationMgr;

const init = () => {
    navigationMgr = new Navigation();
    navigationMgr.addPage(new Page("discover", false));
    navigationMgr.addPage(new Page("matches", false));
}

document.addEventListener("DOMContentLoaded", init);
