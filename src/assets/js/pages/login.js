import Page from "../modules/page.js";

export default class Login extends Page {
    constructor(main) {
        super(main, "page-login", {authenticated: true, inNavBar: true})
    }
}