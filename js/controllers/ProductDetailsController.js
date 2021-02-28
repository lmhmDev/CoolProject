import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { productDetails, editProduct, deleteProduct, nothingHereDetails } from '../views.js'


export default class ProductDetails extends BaseController {
    constructor(element) {
        super(element);
        this.attatchEventListener();
    }


    async attatchEventListener() {
        this.element.innerHTML = '';
        let id = '';
        this.publish(this.events.START_LAODING);
        try {
            const queryParams = window.location.search.replace('?', '');
            const queryParamsParts = queryParams.split('=');
            if (queryParamsParts.length >= 2 && queryParamsParts[0] == 'id') {
                id = queryParamsParts[1];
            }

            const product = await dataService.getProductDetails(id);
            if (product != null) {
                const { userId } = await dataService.getUser();
                this.element.innerHTML = await productDetails(product, userId);
                if (product.userId == userId) {
                    const deleteModal = document.querySelector('.deleteModal');

                    deleteModal.innerHTML = '';
                    deleteModal.innerHTML = deleteProduct();


                    const deleteButton = deleteModal.querySelector('.deleteProduct');
                    const cancelButton = deleteModal.querySelector('.cancel');
                    this.element.querySelector('.trash').addEventListener('click', () => {
                        deleteModal.classList.remove('hidden')
                    });

                    cancelButton.addEventListener('click', () => {
                        deleteModal.classList.add('hidden');
                    });

                    deleteButton.addEventListener('click', async () => {
                        await dataService.deleteProduct(product);
                        alert('Product Successfully deleted');
                        window.location.href = "/";
                    });

                    const editModal = document.querySelector('.editModal');

                    editModal.innerHTML = '';
                    editModal.innerHTML = editProduct(product);

                    const cancelEditButton = editModal.querySelector('.cancelEditButton');
                    const form = editModal.querySelector('form');

                    this.element.querySelector('.edit').addEventListener('click', () => {
                        editModal.classList.remove('hidden')
                    });

                    cancelEditButton.addEventListener('click', () => {
                        editModal.classList.add('hidden');
                    });

                    form.addEventListener('submit', async (event) => {
                        event.preventDefault();
                        var tags = [];
                        var checkBoxes = editModal.querySelectorAll('.checkbox');
                        for (var i = 0; checkBoxes[i]; ++i) {
                            if (checkBoxes[i].checked) {
                                tags.push(checkBoxes[i].value);
                            }
                        }

                        const newProduct = {
                            name: form.elements.name.value,
                            price: form.elements.price.value,
                            description: form.elements.description.value,
                            sellBuy: form.elements.sellBuy.value,
                            tags: tags,
                            image: null
                        }

                        if (form.elements.file.files.length > 0) {
                            newProduct.image = form.elements.file.files[0];
                        }

                        await dataService.updateProduct(product, newProduct);
                        alert('Product Successfully deleted');
                        window.location.href = window.location.href;
                    });
                }

            } else {
                this.element.innerHTML = nothingHereDetails();
            }



        } catch (error) {
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING);
        }

    }


}