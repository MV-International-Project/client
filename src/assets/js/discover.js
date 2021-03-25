"use strict";

const initDiscover = () => {
    document.querySelector('#notification-btn').removeEventListener('click', toggleNotifications);
    document.querySelector('#notification-btn').addEventListener('click', toggleNotifications);
    document.querySelector('#filter-btn').removeEventListener('click', toggleFilters);
    document.querySelector('#filter-btn').addEventListener('click', toggleFilters);
    document.querySelector('body').addEventListener('click', (e) => closeOverlays(e.target));

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

    document.querySelectorAll('#filters input[type=checkbox]').forEach(el => el.addEventListener('input', changedMatchFilter));

    return true;
}

const changedMatchFilter = (e) => {
    if (e.currentTarget.checked) {
        e.currentTarget.parentNode.querySelector('.fa-square').style.display = 'none';
        e.currentTarget.parentNode.querySelector('.fa-check-square').style.display = '';
    } else {
        e.currentTarget.parentNode.querySelector('.fa-square').style.display = '';
        e.currentTarget.parentNode.querySelector('.fa-check-square').style.display = 'none';
    }
}

const closeOverlays = (e) => {
    console.log(e);
    if (e.id === "notifications" || e.id === "filters") return;
    if (e.id === "filter-btn" && e.id !== "notification-btn") return hideNotificationElement();
    if (e.id !== "filter-btn" && e.id === "notification-btn") return hideFilterElement();
    e.parentNode.tagName !== 'BODY' ? closeOverlays(e.parentNode): hideAllElements();
}

const hideNotificationElement = () => document.querySelector('#notifications').classList.remove('active');
const hideFilterElement = () => document.querySelector('#filters').classList.remove('active');
const hideAllElements = () => { hideNotificationElement();hideFilterElement(); }

const toggleNotifications = (e) => { e.preventDefault(); document.querySelector('#notifications').classList.toggle('active'); }
const toggleFilters = (e) => { e.preventDefault(); document.querySelector('#filters').classList.toggle('active'); }