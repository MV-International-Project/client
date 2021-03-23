

class Navigation {
    _pages = new Map();
    _history = [];

    constructor() {
        document.addEventListener('click', (e) => this.checkClick(e.target));
    }

    checkClick(elToCheck) {
        if (elToCheck.hasAttribute('data-navigation')) this.loadPage(this._pages.get(elToCheck.getAttribute('data-navigation')));
        elToCheck.parentNode !== null && elToCheck.parentNode.tagName !== 'BODY' ? this.checkClick(elToCheck.parentNode) : null;
    }

    addPage(page) {
        this._pages.set(page.id, page);
    }

    loadPage(pageId) {
        // Check if previous page closes before opening the next one.
        if (this._history[this._history.length - 1].close()) {
            this._pages.get(pageId).open();
            this._history.push(this._pages.get(pageId));
        }
    }
}

class Page {
    _id;
    _authenticated;
    _onOpen;
    _onClose;

    constructor(id, authenticated, onOpen = null, onClose = null) {
        this._id = id;
        this._authenticated = authenticated;
        this._onOpen = onOpen;
        this._onClose = onClose;
    }

    get id() { return this._id }

    open() {
        if (this._authenticated /*&& !isAuthenticated()*/) return;
        if (this._onOpen !== null) if (!this._onOpen()) return;

        document.getElementById(this._id).classList.add('show');

        return true;
    }

    close() {
        if (this._onOpen !== null) if (!this._onClose()) return false;

        document.getElementById(this._id).classList.remove('show');

        return true;
    }
}