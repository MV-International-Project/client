import Page from "../modules/page.js";

export default class Settings extends Page {
    constructor(main) {
        super(main, "page-settings", {authenticated: true, inNavBar: true});
        
        this._username = document.querySelector("#username");
        this._description = document.querySelector("#description");
        document.querySelector("#page-settings form").removeEventListener('submit', this.update);
        document.querySelector("#page-settings form").addEventListener('submit', this.update);
    }

    onOpen = async () => {
        const user = await this.main.apiHandler.getUser();

        this._username.value = user.username;
        this._description.value = user.description;
    }

    onClose = () => {
        this.update();
        return true;
    }

    update = (e) => {
        if (e !== undefined) e.preventDefault();
        this.main.apiHandler.updateSettings(this._username.value, this._description.value);
    }
}