export default class Page {
    _id;
    _settings = {
        authenticated: false,
        inNavBar: false
    };
    onOpen = null;
    onClose = null;

    constructor(main, id, settings) {
        this.main = main;
        this._id = id;
        Object.keys(settings).forEach(k => this._settings[k] = settings[k]);
    }

    get id() { return this._id }

    async open() {
        if (this._settings.authenticated && await !this.main.apiHandler.isAuthenticated()) return this.main.navigationMgr.preload('page-login');
        if (this.onOpen !== null) if (!this.onOpen()) return;

        if (this._settings.inNavBar) {
            document.querySelectorAll('body > nav li').forEach(navItem => {
                if (navItem.getAttribute('data-navigation') === this._id) navItem.classList.add('active');
                else navItem.classList.remove('active');
            });
        }

        document.getElementById(this._id).classList.add('show');

        return true;
    }

    close(newPage) {
        if (this.onClose !== null) if (!this.onClose(newPage)) return false;

        document.getElementById(this._id).classList.remove('show');

        return true;
    }
}