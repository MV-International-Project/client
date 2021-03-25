"use strict";
export default class Swipe {
    startPos;
    lastPos;

    constructor(main) {
        this.main = main;

        document.querySelector('#swipe-box').addEventListener('touchstart', this.startSwipe);
        document.querySelector('#swipe-box').addEventListener('touchmove', this.swiping);
        document.querySelector('#swipe-box').addEventListener('touchend', this.endSwipe);
    
        document.querySelector('#denyUser').addEventListener('click', (e) => {
            e.preventDefault();
            this.cleanupSwipe(false);
        });
        document.querySelector('#likeUser').addEventListener('click', (e) => {
            e.preventDefault();
            this.cleanupSwipe(true);
        });
    }

    startSwipe = (e) => {
        this.startPos = e.touches[0].clientX;
        this.lastPos = 0;
    }
    
    swiping = (e) => {
        e.preventDefault();
        this.lastPos = ((e.touches[0].clientX / window.innerWidth) * 12) - 6;
        document.querySelector('#swipe-box article.active').style.transform = `rotate(${this.lastPos}deg) translateY(-500%)`;
    }
    
    endSwipe = (e) => {
        if (this.lastPos < -5) {
            this.cleanupSwipe(false)
        } else if (this.lastPos > 5) {
            this.cleanupSwipe(true)
        } else {
            document.querySelector('#swipe-box article.active').style.transition = 'transform .3s ease-in-out';
            document.querySelector('#swipe-box article.active').style.transform = '';
            setTimeout(() => document.querySelector('#swipe-box article.active').style.transition = '', 400);
        }
    }
    
    cleanupSwipe = (accepted) => {
        const userId = document.querySelector('#swipe-box article.active').id;
        document.querySelector('#swipe-box article.active').style.transition = 'transform .3s ease-in-out';
        document.querySelector('#swipe-box article.active').style.transform = `rotate(${accepted ? '': '-'}8deg) translateY(-500%)`;
        setTimeout(() => {
            document.querySelector('#swipe-box article.active').style.transition = '';
            document.querySelector('#swipe-box article.active').remove();
        }, 400);
    
        this.main.apiHandler.loadNewUser();
        // if (accepted) acceptUser(userId);
        // else denyUser(userId);
    }
}