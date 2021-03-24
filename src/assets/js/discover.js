"use strict";

const initDiscover = () => {
    document.querySelector('#notification-btn').removeEventListener('click', toggleNotifications);
    document.querySelector('#notification-btn').addEventListener('click', toggleNotifications);
    document.querySelector('body').addEventListener('click', (e) => closeNotification(e.target));

    return true;
}

const closeNotification = (e) => {
    console.log(e);
    if (e.id === "notifications" || e.id === "notification-btn") return;
    e.parentNode.tagName !== 'BODY' ? closeNotification(e.parentNode): document.querySelector('#notifications').classList.remove('active');
}

const toggleNotifications = (e) => {
    e.preventDefault();

    document.querySelector('#notifications').classList.toggle('active');
}