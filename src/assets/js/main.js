import {Navigation, Page} from './modules/navigation.js';
import apiHandler from './modules/api.js';
import initDiscover from './modules/discover.js';
import {closeMatches, openMatches} from './modules/matches.js';
import swipeInit from './modules/swipe.js';
import Settings from "./modules/settings.js";

class Main {
    constructor() {
        this.navigationMgr = new Navigation(this);
        this.apiHandler = new apiHandler(this);
        this.settingsHandler = new Settings(this.apiHandler);
        this.navigationMgr.addPage(new Page(this, "page-discover", {
            authenticated: true,
            inNavBar: true,
            onOpen: initDiscover
        }));
        this.navigationMgr.addPage(new Page(this, "page-matches", {
            authenticated: true,
            inNavBar: true,
            onOpen: openMatches,
            onClose: closeMatches
        }));
        this.navigationMgr.addPage(new Page(this, "page-settings", {
            authenticated: true,
            inNavBar: true,
            onOpen: this.settingsHandler.init
        }));
        this.navigationMgr.addPage(new Page(this, "page-login", {authenticated: false, inNavBar: false}));

        this.navigationMgr.preload('page-discover');

        swipeInit();

        document.querySelector('.logBTN').addEventListener('click', this.apiHandler.authWithDiscord);
        document.querySelector("#logout").addEventListener("click", this.apiHandler.logout);
        document.querySelector("#page-settings form").addEventListener('submit', this.settingsHandler.update)
    }
}


document.addEventListener("DOMContentLoaded", () => new Main());
