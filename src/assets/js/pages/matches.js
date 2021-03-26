import Page from "../modules/page.js";

export default class Matches extends Page {
    constructor(main) {
        super(main, "page-matches", {authenticated: true, inNavBar: true});
    }

    onOpen = () => {
        let moveTo = '100';
        if (this.main.navigationMgr._history.length < 1) return true;
        if (this.main.navigationMgr._history[this.main.navigationMgr._history.length - 2].id === 'page-settings') moveTo = '-100';
    
        document.querySelector('#page-matches').style.transition = 'width .3s ease-in-out';
        document.querySelector('#page-matches').style.transform = `translateX(${moveTo}%)`;
        setTimeout(() => {
            document.querySelector('#page-matches').style.transition = 'transform .3s ease-in-out';
            document.querySelector('#page-matches').classList.add('show');
            document.querySelector('#page-matches').style.transform = ``;
        }, 10);

        this.main.apiHandler.loadMatches();

        return true;
    }
    
    onClose = (np) => {
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
    }
}