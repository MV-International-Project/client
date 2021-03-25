import apiHandler from "./api.js";

export default class Settings {

    constructor(apiHandler) {
        this.apiHanlder = apiHandler;
        this._username = document.querySelector("#username")
        this._description = document.querySelector("#description")
    }

    init = async () => {
        const user = await this.apiHanlder.getUser();

        this._username.value = user.username;
        this._description.value = user.description;
    }

    update = (e) => {
        e.preventDefault();
        this.apiHanlder.updateSettings(this._username.value, this._description.value)
    }
}

