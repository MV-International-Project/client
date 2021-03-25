import * as endpoints from './modules/endpoints.js'


const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

endpoints.getAccessToken(code);
