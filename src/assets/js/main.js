import Navigation from './modules/navigation.js';
import apiHandler from './modules/api.js';
import config from './modules/config.js';
import Matches from './pages/matches.js';
import Swipe from './modules/swipe.js';
import Discover from './pages/discover.js';
import Settings from './pages/settings.js';
import Login from './pages/login.js';

class Main {
    constructor() {
        this.navigationMgr = new Navigation(this);
        this.apiHandler = new apiHandler(this);
        this.navigationMgr.addPage(new Discover(this));
        this.navigationMgr.addPage(new Matches(this));
        this.navigationMgr.addPage(new Settings(this));
        this.navigationMgr.addPage(new Login(this));
    
        this.navigationMgr.preload('page-discover');

        new Swipe(this);

        document.querySelector('.logBTN').addEventListener('click', this.apiHandler.authWithDiscord);
        document.querySelector("#logout").addEventListener("click", this.apiHandler.logout);
    }
}


document.addEventListener("DOMContentLoaded", () => new Main());
