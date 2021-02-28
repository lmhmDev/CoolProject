import BaseController from './BaseController.js';
import { productView, nothingHereIndex } from '../views.js'
import dataService from '../services/DataService.js'

export default class ProductController extends BaseController {
    constructor(element, fromUser = false) {
        super(element);
        this.fromUser = fromUser;
        this.loadProducts();

        this.subscribe(this.events.SEARCH, query => {
            this.loadProducts(query);
        });

    }


    renderProducts(products) {
        this.element.innerHTML = '';
        if (products.length > 0) {
            for (const product of products) {
                const article = document.createElement('article');
                article.innerHTML = productView(product);
                this.element.appendChild(article);
            }
        } else {
            this.element.innerHTML = nothingHereIndex();
        }
    }

    async loadProducts(query = null) {
        this.publish(this.events.START_LAODING, {});
        let userId = null;
        if (this.fromUser == true) {
            const user = await dataService.getUser();
            userId = user.userId;
        }

        try {
            const products = await dataService.getProducts(query, userId);
            this.renderProducts(products);

        } catch (err) {
            console.log(err);
            this.publish(this.events.ERROR, err);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}