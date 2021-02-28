const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';


export default {

    getProducts: async function (query = null, userId = null) {
        let url = `${BASE_URL}/api/products?_sort=id&_order=desc`;

        if (userId) {
            url += `&userId=${userId}`;
        }

        if (query) {
            url += `&q=${query}`;
        }
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    post: async function (url, postData, json = true) {
        return await this.request('POST', url, postData, json);
    },

    delete: async function (url) {
        return await this.request('DELETE', url, {});
    },

    put: async function (url, putData, json = true) {
        return await this.request('PUT', url, putData, json);
    },

    request: async function (method, url, postData, json = true) {
        const config = {
            method: method,
            headers: {},
            body: null
        };
        if (json) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData);  // convierte el objeto de usuarios en un JSON
        } else {
            config.body = postData;
        }
        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, config);
        const data = await response.json();  // respuesta del servidor sea OK o sea ERROR.
        if (response.ok) {
            return data;
        } else {
            // TODO: mejorar gestión de errores
            // TODO: si la respuesta es un 401 no autorizado, debemos borrar el token (si es que lo tenemos);
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    registerUser: async function (user) {
        const url = `${BASE_URL}/auth/register`
        return await this.post(url, user);
    },

    login: async function (user) {
        const url = `${BASE_URL}/auth/login`
        return await this.post(url, user);
    },

    saveToken: async function (token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function () {
        return localStorage.getItem(TOKEN_KEY);
    },

    deleteToken: async function () {
        localStorage.removeItem(TOKEN_KEY);
    },

    isUserLogged: async function () {
        const token = await this.getToken();
        return token !== null;
    },

    getUser: async function () {
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                return null;
            }
            const payload = tokenParts[1]; // cogemos el payload, codificado en base64
            const jsonStr = atob(payload); // descodificamos el base64
            const { userId, username } = JSON.parse(jsonStr); // parseamos el JSON del token descodificado
            return { userId, username };
        } catch (error) {
            return null;
        }
    },

    getProductDetails: async function (id) {
        let url = `${BASE_URL}/api/products/`
        try {
            url += id;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return null;
            }

        } catch (error) {
            console.log('error');
            return null;
        }
    },

    uploadImage: async function (image) {
        const form = new FormData();
        form.append('file', image);
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        return response.path || null;
    },

    uploadProduct: async function (product) {
        const url = `${BASE_URL}/api/products`;
        if (product.image) {
            const imageURL = await this.uploadImage(product.image);
            product.image = imageURL;
        }
        return await this.post(url, product);
    },

    deleteProduct: async function (product) {
        const url = `${BASE_URL}/api/products/${product.id}`
        return await this.delete(url);
    },

    updateProduct: async function (product, newProduct) {
        const url = `${BASE_URL}/api/products/${product.id}`
        if (newProduct.image) {
            const imageURL = await this.uploadImage(newProduct.image);
            newProduct.image = imageURL;
        } else {
            newProduct.image = product.image;
        }
        return await this.put(url, newProduct);
    }



}