import Page from "../modules/page.js";
import { profilePage } from '../modules/template.js';

export default class Profile extends Page {
    constructor(main) {
        super(main, "page-profile", {authenticated: true, inNavBar: false});
    }

    onOpen = () => {
        console.log(sessionStorage.getItem('pts'));
        const u = JSON.parse(CryptoJS.AES.decrypt(document.querySelector(`#${sessionStorage.getItem('pts')}`).getAttribute('data-info'), "ip_project").toString(CryptoJS.enc.Utf8));

        document.querySelector('#page-profile').innerHTML = profilePage(u);
        return true;
    }
}