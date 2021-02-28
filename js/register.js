import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import RegisterFormController from './controllers/RegisterFormController.js'

const loader = document.querySelector('.lds-ring');
const loaderControler = new LoaderController(loader);

const errorContainer = document.querySelector('.global-errors');
const errorController = new ErrorController(errorContainer);

const form = document.querySelector('form');
const registerFormController = new RegisterFormController(form);