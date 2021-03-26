import Page from "../modules/page.js";

export default class Discover extends Page {
    constructor(main) {
        super(main, "page-discover", {authenticated: true, inNavBar: true})
    }

    onOpen = () => {
        document.querySelector('#notification-btn').removeEventListener('click', this.toggleNotifications);
        document.querySelector('#notification-btn').addEventListener('click', this.toggleNotifications);
        document.querySelector('#filter-btn').removeEventListener('click', this.toggleFilters);
        document.querySelector('#filter-btn').addEventListener('click', this.toggleFilters);
        document.querySelector('body').addEventListener('click', (e) => this.closeOverlays(e.target));
    
        document.querySelectorAll('#selectAll').forEach(el => el.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#filters form label input').forEach(el => {
                el.checked = false;
                el.click();
            });
        }));
    
        document.querySelectorAll('#selectNone').forEach(el => el.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#filters form label input').forEach(el => {
                el.checked = true;
                el.click();
            });
        }));
    
        document.querySelectorAll('#filters input[type=checkbox]').forEach(el => el.addEventListener('input', this.changedMatchFilter));
    
        this.main.apiHandler.loadNewUser();

        return true;
    }
    
    changedMatchFilter = (e) => {
        if (e.currentTarget.checked) {
            e.currentTarget.parentNode.querySelector('.fa-square').style.display = 'none';
            e.currentTarget.parentNode.querySelector('.fa-check-square').style.display = '';
        } else {
            e.currentTarget.parentNode.querySelector('.fa-square').style.display = '';
            e.currentTarget.parentNode.querySelector('.fa-check-square').style.display = 'none';
        }
    }
    
    closeOverlays = (e) => {
        if (e.classList.contains('show-more')) {
            if (e.parentNode.hasAttribute('data-info')) {
                sessionStorage.setItem('pts', e.parentNode.id);
            } else {
                sessionStorage.setItem('pts', e.parentNode.parentNode.id);
            }
            this.main.navigationMgr.loadPage('page-profile');
        }
        if (e.id === "notifications" || e.id === "filters") return;
        if (e.id === "filter-btn" && e.id !== "notification-btn") return this.hideNotificationElement();
        if (e.id !== "filter-btn" && e.id === "notification-btn") return this.hideFilterElement();
        e.parentNode.tagName !== 'BODY' ? this.closeOverlays(e.parentNode): this.hideAllElements();
    }
    
    hideNotificationElement = () => document.querySelector('#notifications').classList.remove('active');
    hideFilterElement = () => document.querySelector('#filters').classList.remove('active');
    hideAllElements = () => { this.hideNotificationElement();this.hideFilterElement(); }
    
    toggleNotifications = (e) => { e.preventDefault(); document.querySelector('#notifications').classList.toggle('active'); }
    toggleFilters = (e) => { e.preventDefault(); document.querySelector('#filters').classList.toggle('active'); }
    
}