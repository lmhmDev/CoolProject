import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NavController from './controllers/NavController.js';
import ProductDetailsController from './controllers/ProductDetailsController.js'

const loader = document.querySelector('.lds-ring');
const loaderController = new LoaderController(loader);

const errorElement = document.querySelector('.global-errors');
const errorController = new ErrorController(errorElement);

const navElement = document.querySelector('.nav-options');
const navController = new NavController(navElement);

const productDetailsElement = document.querySelector('.product');
const productDetailsController = new ProductDetailsController(productDetailsElement);