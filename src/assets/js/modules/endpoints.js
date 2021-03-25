"use strict";

import config from "./config.js"

const base = `http://${config.host}:${config.port}/api/`

export function authorizeWithDiscord() {
    location.href = "https://discord.com/api/oauth2/authorize?" + new URLSearchParams({
        redirect_uri: base + "users/login",
        scope: "identify connections gdm.join",
        client_id: config.client_id,
        response_type: "code"
    })
}

export function logout() {
    return fetch(base + "logout", {
        method: "post"
    })
}

export function isAuth() {
    return fetch(base + "users/authenticated")
}
// helper functions

export function getBaseURL() {
    return `${location.protocol}//${location.host}${location.pathname}`
}


