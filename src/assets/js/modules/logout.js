import * as endpoints from './endpoints.js'


function redirectToIndex() { // prob changed with sign and main merge
    window.location.href = window.location.href.replace(/\/(?:index\.html)?$/i, "/sign.html")
    // regex replace bc origin is not constant it needs to match / and /index.html, wont match query params though
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#logout").addEventListener("click", (e) => {
        e.preventDefault();
        endpoints.logout().then(redirectToIndex)
    })
})