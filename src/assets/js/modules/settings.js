import apiHandler from "./api.js";

export default class Settings {

    constructor(apiHandler) {
        this.apiHanlder = apiHandler;
        this._username = document.querySelector("#username");
        this._description = document.querySelector("#description");
    }

    init = async () => {

    }
}

