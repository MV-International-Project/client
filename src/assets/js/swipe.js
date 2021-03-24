"use strict";

let swipeInitialized = false;
let startPos, lastPos;

const swipeInit = () => {
    document.querySelector('#swipe-box').addEventListener('touchstart', startSwipe);
    document.querySelector('#swipe-box').addEventListener('touchmove', swiping);
    document.querySelector('#swipe-box').addEventListener('touchend', endSwipe);

    document.querySelector('#denyUser').addEventListener('click', (e) => {
        e.preventDefault();
        cleanupSwipe(false);
    });
    document.querySelector('#likeUser').addEventListener('click', (e) => {
        e.preventDefault();
        cleanupSwipe(true);
    });
}

const startSwipe = (e) => {
    startPos = e.touches[0].clientX;
    lastPos = 0;
}

const swiping = (e) => {
    e.preventDefault();
    console.log(((e.touches[0].clientX / window.innerWidth) * 12) - 6);
    lastPos = ((e.touches[0].clientX / window.innerWidth) * 12) - 6;
    document.querySelector('#swipe-box article.active').style.transform = `rotate(${lastPos}deg) translateY(-500%)`;
}

const endSwipe = (e) => {
    if (lastPos < -5) {
        cleanupSwipe(false)
    } else if (lastPos > 5) {
        cleanupSwipe(true)
    } else {
        document.querySelector('#swipe-box article.active').style.transition = 'transform .3s ease-in-out';
        document.querySelector('#swipe-box article.active').style.transform = '';
        setTimeout(() => document.querySelector('#swipe-box article.active').style.transition = '', 400);
    }
}

const cleanupSwipe = (accepted) => {
    const userId = document.querySelector('#swipe-box article.active').id;
    document.querySelector('#swipe-box article.active').style.transition = 'transform .3s ease-in-out';
    document.querySelector('#swipe-box article.active').style.transform = `rotate(${accepted ? '': '-'}8deg) translateY(-500%)`;
    setTimeout(() => {
        document.querySelector('#swipe-box article.active').style.transition = '';
        document.querySelector('#swipe-box article.active').remove();
    }, 400);

    // loadNewUser();
    // if (accepted) acceptUser(userId);
    // else denyUser(userId);
}

document.addEventListener('DOMContentLoaded', swipeInit);