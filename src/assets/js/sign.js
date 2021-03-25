import * as endpoints from './modules/endpoints.js'

async function init(){
    document.querySelector(".logBTN").addEventListener("click", endpoints.authorizeWithDiscord)

}

document.addEventListener("DOMContentLoaded", init);

