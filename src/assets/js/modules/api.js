import config from "./config.js";

export default class apiHandler {
    apiUrl = `http://${config.host}:${config.port}/api`;

    constructor(main) {
        this.main = main;
    }

    isAuthenticated = async (cb) => {
        return await this.apiCall('/users/authenticated', 'GET', true);
    }

    logout = () => {
        this.apiCall('/users/logout', 'POST', true)
            .then(() => {
                location.reload();
            })
    }

    loadNewUser = () => {
        this.apiCall('/users/matchSuggestion', 'GET', true)
            .then(response => {
                console.log(response);
            });
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
            .then(response => response.json());
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
}



