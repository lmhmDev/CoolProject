import LoaderControler from './controllers/LoaderController.js'
import ErrorController from './controllers/ErrorController.js'
import LoginController from './controllers/LoginController.js'

const loader = document.querySelector('.lds-ring');
const loaderControler = new LoaderControler(loader);

const errorContainer = document.querySelector('.global-errors');
const errorController = new ErrorController(errorContainer);

const form = document.querySelector('form');
const loginController = new LoginController(form);