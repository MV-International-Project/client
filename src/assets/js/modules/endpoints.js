"use strict";

import config from "./config.js"

const base = `http://${config.host}:${config.port}/api/`

function constructRedirectURL() {
    return window.location.origin.replace("localhost", "127.0.0.1") + window.location.pathname.replace("sign.html", "redirect.html")
}

export function authorizeWithDiscord() {
    location.href = "https://discord.com/api/oauth2/authorize?" + new URLSearchParams({
        redirect_uri: constructRedirectURL(),
        scope: "identify connections gdm.join",
        client_id: config.client_id,
        response_type: "code"
    })
}

export function getAccessToken(code) {
    console.log(code)
    fetch("https://discord.com/api/oauth2/token",
        {
            method: "post",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: base + "discord",
                scope: "identify connections gdm.join",
                client_id: config.client_id,
                client_secret: config.client_secret
            })
        }
    ).then(r => r.json())
        .then(console.log)
}