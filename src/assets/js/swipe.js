"use strict";

let swipeInitialized = false;
let 

const init = () => {
    document.querySelector('#swipe-box').addEventListener('touchstart', startSwipe);
    document.querySelector('#swipe-box').addEventListener('touchmove', swiping);
    document.querySelector('#swipe-box').addEventListener('touchend', endSwipe);
}

const startSwipe = (e) => {

}

const swiping = (e) => {
    if (!swipeInitialized) {


        swipeInitialized = true;
    }
}

const endSwipe = () => {

}

document.addEventListener('DOMContentLoaded', init);