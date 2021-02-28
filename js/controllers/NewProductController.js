import BaseController from './BaseController.js';
import dataService from '../services/DataService.js'


export default class NewProductController extends BaseController {
    constructor(element) {
        super(element);
        this.isUserLogged();
        this.attachEventListener();
        this.focus();
    }

    async isUserLogged() {
        this.publish(this.events.START_LAODING);
        const isLogged = await dataService.isUserLogged();
        if (!isLogged) {
            window.location.href = '/login.html?next=/newProduct.html'
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focus() {
        const titleInput = document.querySelector('#name');
        titleInput.focus();
    }

    attachEventListener() {
        const textarea = this.element.querySelector('textarea');
        textarea.addEventListener('keyup', () => {
            const button = this.element.querySelector('button');
            if (this.element.checkValidity()) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', true);
            }
        });

        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            input.addEventListener('keyup', event => {
                // valido si todo el formulario es OK para habilitar o deshabilitar el botón
                if (this.element.checkValidity()) {
                    button.removeAttribute('disabled');
                    // button.setAttribute('disabled', false); // esto también valdría
                } else {
                    button.setAttribute('disabled', true);
                }
            });
        });

        this.element.querySelectorAll('.radio').forEach(input => {
            const button = this.element.querySelector('button');
            input.addEventListener('click', event => {
                // valido si todo el formulario es OK para habilitar o deshabilitar el botón
                if (this.element.checkValidity()) {
                    button.removeAttribute('disabled');
                    // button.setAttribute('disabled', false); // esto también valdría
                } else {
                    button.setAttribute('disabled', true);
                }
            });
        });


        this.element.addEventListener('submit', async event => {
            event.preventDefault();  // cancelamos el envío del formulario (comportamiento por defecto)
            var tags = [];
            var checkBoxes = this.element.querySelectorAll('.checkbox');
            for (var i = 0; checkBoxes[i]; ++i) {
                if (checkBoxes[i].checked) {
                    tags.push(checkBoxes[i].value);
                }
            }
            const product = {
                name: this.element.elements.name.value,
                price: this.element.elements.price.value,
                sellBuy: this.element.elements.sellBuy.value,
                description: this.element.elements.description.value,
                tags: tags,
                image: null
            }
            if (this.element.elements.file.files.length > 0) {
                product.image = this.element.elements.file.files[0];
            }
            this.publish(this.events.START_LOADING);
            try {
                await dataService.uploadProduct(product);
                alert('Product created successfully')
                window.location.href = '/'
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING)
            }
        });

    }
}