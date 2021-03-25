"use strict";

const apiUrl = "http://localhost:8080/api";

const isAuthenticated = async (cb) => {
    return await apiCall('/users/authenticated', 'GET', true);
}

const apiCall = (uri, method = 'GET', authenticated, body) => {
    return fetch(apiUrl + uri, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: authenticated ? `Bearer ${localStorage.getItem('token')}` : undefined
        },
        body: JSON.stringify(body)
    })
        .then(validate)
        .then(response => response.json());
}

const validate = (response) => {
    if (response.status === 403 || response.status === 401) { // failed to auth
        navigationMgr.loadPage('page-login');
        localStorage.removeItem("token");
    }
    return response;
}

