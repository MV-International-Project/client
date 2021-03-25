"use strict";

import config from "./config.js"

const base = `http://${config.host}:${config.port}/api/`

function constructRedirectURL() {
    return window.location.origin.replace("localhost", "127.0.0.1") + window.location.pathname.replace("sign.html", "redirect.html")
}

export function authorizeWithDiscord() {
    location.href = "https://discord.com/api/oauth2/authorize?" + new URLSearchParams({
        redirect_uri: base + "users/login",
        scope: "identify connections gdm.join",
        client_id: config.client_id,
        response_type: "code"
    })
}

export function getAccessToken(code) {
    return fetch(base + "users/login",
        {
            method: "post",
            body: {
                code: code
            }
        }
    )
}