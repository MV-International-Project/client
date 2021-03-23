"use strict";

let navigationMgr;

const init = () => {
    navigationMgr = new Navigation();
    navigationMgr.addPage(new Page("page-discover", {authenticated: false, inNavBar: true}));
    navigationMgr.addPage(new Page("page-matches", {authenticated: false, inNavBar: true}));

    navigationMgr.preload('page-discover');
}

document.addEventListener("DOMContentLoaded", init);
