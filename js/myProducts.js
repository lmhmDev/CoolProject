import ProductsController from './controllers/ProductsController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import SearchController from './controllers/SearchController.js';
import NavController from './controllers/NavController.js';

const loader = document.querySelector('.lds-ring');
const loaderControler = new LoaderController(loader);

const errorContainer = document.querySelector('.global-errors');
const errorController = new ErrorController(errorContainer);

const productsContainer = document.querySelector('.products');
const productsController = new ProductsController(productsContainer, true);

const searchElement = document.querySelector('.searchElement');
const searchController = new SearchController(searchElement);

const navElement = document.querySelector('.nav-options');
const navController = new NavController(navElement);