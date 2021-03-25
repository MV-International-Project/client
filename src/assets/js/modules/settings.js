import apiHandler from "./api.js";

export default class Settings {

    constructor(apiHandler) {
        this.apiHanlder = apiHandler;
    }

    init = async () => {
        const inputUsername = document.querySelector("#username")
        const inputDescription = document.querySelector("#description")

        const user = await this.apiHanlder.getUser();

        inputUsername.value = user.username;
        inputDescription.value = user.description;
    }
}

