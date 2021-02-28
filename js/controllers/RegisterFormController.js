import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class RegisterFormController extends BaseController {
    constructor(element) {
        super(element);

        this.attatchEventListener();

    }

    async makePost(user) {
        const data = await dataService.registerUser(user);
        alert('Usuario creado con éxito!');
        window.location.href = '/login.html';  // envía al usuario a la página de login
    }

    checkInputErrors() {
        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('.button');
            if (input.validity.valid) {
                input.classList.add('is-success');
                input.classList.remove('is-danger');
            } else {
                input.classList.remove('is-success');
                input.classList.add('is-danger');
                console.error(input.validationMessage)
            }

            // valido si todo el formulario es OK para habilitar o deshabilitar el botón
            if (this.element.checkValidity()) {
                button.removeAttribute('disabled');
                // button.setAttribute('disabled', false); // esto también valdría
            } else {
                button.setAttribute('disabled', true);
            }
        });
    }


    attatchEventListener() {

        this.element.addEventListener('submit', async (event) => {
            event.preventDefault();
            const user = {
                username: this.element.elements.name.value,
                password: this.element.elements.password.value
            };
            this.publish(this.events.START_LAODING);
            try {
                await this.makePost(user);
            } catch (err) {
                this.publish(this.events.ERROR, err);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });



        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('.button');
            input.addEventListener('keyup', event => {
                this.checkInputErrors();
            });
        });

        this.element.querySelectorAll('input[type="password"]').forEach(input => {
            const button = this.element.querySelector('.button');
            input.addEventListener('keyup', event => {
                const passInput = this.element.elements['password'];
                const passConfirmInput = this.element.elements['newPassword'];
                if (passInput.value !== passConfirmInput.value) {
                    passInput.setCustomValidity('Las password no coinciden'); // marco el input como erróneo
                    passConfirmInput.setCustomValidity('Las password no coinciden'); // marco el input como erróneo
                } else if (passInput.value.length <= 0) {
                    passInput.setCustomValidity('La password debe ser mas larga');
                } else {
                    passInput.setCustomValidity(''); // el input está ok
                    passConfirmInput.setCustomValidity(''); // el input está ok
                }
                this.checkInputErrors();
            });
        })
    }




}