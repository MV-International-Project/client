

class Navigation {
    _pages = new Map();
    _history = [];

    constructor() {
        document.addEventListener('click', (e) => this.checkClick(e.target));
    }

    checkClick(elToCheck) {
        if (elToCheck.hasAttribute('data-navigation')) this.loadPage(elToCheck.getAttribute('data-navigation'));
        elToCheck.parentNode !== null && elToCheck.parentNode.tagName !== 'BODY' ? this.checkClick(elToCheck.parentNode) : null;
    }

    preload(page) {
        this._pages.get(page).open();
        this._history.unshift(this._pages.get(page));
    }

    addPage(page) {
        this._pages.set(page.id, page);
    }

    loadPage(pageId) {
        // Check if previous page closes before opening the next one.
        if (this._history[this._history.length - 1].close(pageId)) {
            this._pages.get(pageId).open();
            this._history.push(this._pages.get(pageId));
        }
    }
}

class Page {
    _id;
    _settings = {
        authenticated: false,
        inNavBar: false,
        onOpen: null,
        onClose: null
    };

    constructor(id, settings) {
        this._id = id;
        Object.keys(settings).forEach(k => this._settings[k] = settings[k]);
    }

    get id() { return this._id }

    async open() {
        if (this._settings.authenticated && await !isAuthenticated()) return navigationMgr.preload('page-login');
        if (this._settings.onOpen !== null) if (!this._settings.onOpen()) return;

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
        if (this._settings.onClose !== null) if (!this._settings.onClose(newPage)) return false;

        document.getElementById(this._id).classList.remove('show');

        return true;
    }
}