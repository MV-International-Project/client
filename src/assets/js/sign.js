import * as endpoints from './modules/endpoints.js'

function init(){
    document.querySelector(".logBTN").addEventListener("click", endpoints.authorizeWithDiscord)
}

document.addEventListener("DOMContentLoaded", init);
