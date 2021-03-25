const openMatches = () => {
    let moveTo = '100';
    if (navigationMgr._history.length < 1) return true;
    if (navigationMgr._history[navigationMgr._history.length -1].id === 'page-settings') moveTo = '-100';

    document.querySelector('#page-matches').style.transition = 'width .3s ease-in-out';
    document.querySelector('#page-matches').style.transform = `translateX(${moveTo}%)`;
    setTimeout(() => {
        document.querySelector('#page-matches').style.transition = 'transform .3s ease-in-out';
        document.querySelector('#page-matches').classList.add('show');
        document.querySelector('#page-matches').style.transform = ``;
    }, 10);
    return true;
}

const closeMatches = (np) => {
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

export {openMatches, closeMatches};