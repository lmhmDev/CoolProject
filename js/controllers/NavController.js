import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { loggedNav, notLoggedNav } from '../views.js';


export default class NavController extends BaseController {
    constructor(element) {
        super(element);
        this.attatchEventListener();
    }

    async attatchEventListener() {
        this.element.innerHTML = '';
        if (await dataService.isUserLogged()) {
            const { username } = await dataService.getUser();
            this.element.innerHTML = await loggedNav(username);
            this.element.querySelector('.logout').addEventListener('click', () => {
                dataService.deleteToken();
            })
        } else {
            this.element.innerHTML = notLoggedNav();
        }
    }
}