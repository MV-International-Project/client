import Page from "../modules/page.js";

export default class Settings extends Page {
    constructor(main) {
        super(main, "page-settings", {authenticated: true, inNavBar: true})
    }
}