"use strict";

let navigationMgr;

const init = () => {
    navigationMgr = new Navigation();
    navigationMgr.addPage(new Page("page-discover", {authenticated: false, inNavBar: true}));
    navigationMgr.addPage(new Page("page-matches", {authenticated: false, inNavBar: true, onOpen: () => {
        let moveTo = '100';
        if (navigationMgr._history[navigationMgr._history.length -1].id === 'page-settings') moveTo = '-100';

        document.querySelector('#page-matches').style.transition = 'width .3s ease-in-out';
        document.querySelector('#page-matches').style.transform = `translateX(${moveTo}%)`;
        setTimeout(() => {
            document.querySelector('#page-matches').style.transition = 'transform .3s ease-in-out';
            document.querySelector('#page-matches').classList.add('show');
            document.querySelector('#page-matches').style.transform = ``;
        }, 10);
        return true;
    }, onClose: (np) => {
        let moveTo = '100';
        if (np === 'page-settings') moveTo = '-100';

        document.querySelector('#page-matches').style.transition = 'transform .3s ease-in-out';
        document.querySelector('#page-matches').style.transform = `translateX(${moveTo}%)`;
        setTimeout(() => {
            document.querySelector('#page-matches').classList.remove('show');
            setTimeout(() => {
                document.querySelector('#page-matches').style.transform = `0`;
                document.querySelector('#page-matches').style.transition = '';
            }, 300)
        }, 10);
        return true;
    }}));
    navigationMgr.addPage(new Page("page-settings", {authenticated: false, inNavBar: true}));

    navigationMgr.preload('page-discover');
}

document.addEventListener("DOMContentLoaded", init);
