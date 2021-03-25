import {Navigation, Page} from './modules/navigation.js';
import apiHandler from './modules/api.js';
import initDiscover from './modules/discover.js';
import config from './modules/config.js';
import { closeMatches, openMatches } from './modules/matches.js';
import swipeInit from './modules/swipe.js';

class Main {
    constructor() {
        this.navigationMgr = new Navigation(this);
        this.apiHandler = new apiHandler(this);
        this.navigationMgr.addPage(new Page(this, "page-discover", {authenticated: true, inNavBar: true, onOpen: initDiscover}));
        this.navigationMgr.addPage(new Page(this, "page-matches", {authenticated: true, inNavBar: true, onOpen: openMatches, onClose: closeMatches}));
        this.navigationMgr.addPage(new Page(this, "page-settings", {authenticated: true, inNavBar: true}));
        this.navigationMgr.addPage(new Page(this, "page-login", {authenticated: false, inNavBar: false}));
    
        this.navigationMgr.preload('page-discover');

        swipeInit();

        document.querySelector('.logBTN').addEventListener('click', this.authWithDiscord);
    }
    
    authWithDiscord = () => {
        location.href = "https://discord.com/api/oauth2/authorize?" + new URLSearchParams({
            redirect_uri: this.apiHandler.apiUrl + "/users/login",
            scope: "identify connections gdm.join",
            client_id: config.client_id,
            response_type: "code"
        })
    }
}



document.addEventListener("DOMContentLoaded", () => new Main());
