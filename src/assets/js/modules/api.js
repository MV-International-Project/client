import config from "./config.js";

export default class apiHandler {
    apiUrl = `http://${config.host}:${config.port}/api`;

    constructor(main) {
        this.main = main;
    }

    isAuthenticated = async () => {
        return await this.apiCall('/users/authenticated', 'GET', true);
    }

    apiCall = (uri, method = 'GET', authenticated, body) => {
        return fetch(this.apiUrl + uri, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: authenticated ? `Bearer ${this.getCookie('authToken')}` : undefined
            },
            body: JSON.stringify(body)
        })
            .then(this.validate)
            .then(parseJson);
    }

    validate = (response) => {
        if (response.status === 403 || response.status === 401) { // failed to auth
            this.main.navigationMgr.loadPage('page-login');
        }
        return response;
    }
    getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    authWithDiscord = () => {
        location.href = "https://discord.com/api/oauth2/authorize?" + new URLSearchParams({
            redirect_uri: this.apiUrl + "/users/login",
            scope: "identify connections gdm.join",
            client_id: config.client_id,
            response_type: "code"
        })
    }

    logout = () => {
        this.apiCall('/users/logout', 'POST', true)
            .then(() => location.reload())
    }

    getUser = () => {
        return this.apiCall("/user", "GET", true)
    }

    updateSettings = (username, description) => {
        return this.apiCall("/user", "PATCH", true, {username: username, description: description})
    }
}

const parseJson = async response => { // prevent error in log, this way it doesnt clutter the output
    try {
        return await response.json()
    } catch (err) {
        return response
    }
}





