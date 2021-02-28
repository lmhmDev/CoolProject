import NewProductController from './controllers/NewProductController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NavController from './controllers/NavController.js';

const loader = document.querySelector('.lds-ring');
const loaderControler = new LoaderController(loader);

const errorContainer = document.querySelector('.global-errors');
const errorController = new ErrorController(errorContainer);

const navElement = document.querySelector('.nav-options');
const navController = new NavController(navElement);

const form = document.querySelector('form');
const newProductController = new NewProductController(form);