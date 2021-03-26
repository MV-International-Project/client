export default class Navigation {
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

    back() {
        if (this._history[this._history.length - 1].close(pageId)) {
            this._pages.get(this._history[this._history.length - 2]).open();
            this._history.pop();
        }
    }

    loadPage(pageId) {
        // Check if previous page closes before opening the next one.
        if (this._history[this._history.length - 1].close(pageId)) {
            this._pages.get(pageId).open();
            this._history.push(this._pages.get(pageId));
        }
    }
}