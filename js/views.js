export const errorView = (errorMessage) => {
    return `<article class="message is-danger">
    <div class="message-header">
        <p>Error</p>
        <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
    ${errorMessage}
    </div>
</article>`
}

export const productView = (product) => {
    let img = '/img/img-placeholder.png';
    let desc = product.description;
    let name = product.name;
    let tags = '';
    if (desc.length > 20) {
        desc = desc.slice(0, 20);
        desc += '...';
    }

    if (name.length > 15) {
        name = name.slice(0, 15);
        name += '...';
    }

    if (product.image) img = product.image;

    if (product.tags) {
        product.tags.forEach(tag => {
            tags += `<p>${tag}</p>`
        });
    }
    return `<a href="product.html?id=${product.id}"><div class="product">
    <img src="${img}">
    <p class="product-title">${name}</p>
    <p class="product-price">${product.price}€</p>
    <p class="product-desc">${desc}</p>
    <p class="sell-buy">${product.sellBuy}</p>
    <div class="tags">${tags}</div>

    </div></a>`
}

export const loggedNav = (name) => {
    return `Welcome ${name}! <a href="/myProducts.html"><p>My products</p> <i class="fas fa-store"></i></a> <a href="/newProduct.html"><p>New product</p> <i class="fas fa-cart-plus"></i></a> <a href="/login.html" class="logout"><p>Logout</p>
    <i class="fas fa-sign-out-alt"></i></a>`
}
export const notLoggedNav = () => {
    return `<a href="/login.html"> <p>Login</p> <i class="fas fa-sign-in-alt"></i> </a> <a href="/register.html"><p>Register</p> <i class="fas fa-pizza-slice"></i></a>`
}

export const productDetails = (product, userId) => {
    let img = '/img/img-placeholder.png';
    let deleteButton = '';
    let editButton = '';
    let tags = '';
    if (product.image) img = product.image;
    if (product.userId == userId) deleteButton = '<a class="trash"><i class="fas fa-trash"></i></a>';
    if (product.userId == userId) editButton = '<a class="edit"><i class="fas fa-pen"></i></a>';

    if (product.tags) {
        product.tags.forEach(tag => {
            tags += `<p>${tag}</p>`
        });
    }

    return `<div class="info">
    <img src="${img}" alt="">
    <h1>${product.name}</h1>
    <p class="price">${product.price}€</p>
    <p class="description">${product.description}</p>
    <p class="sellBuy">${product.sellBuy}</p>
    <div class="tags">${tags}</div>
    ${deleteButton}
    ${editButton}
    

</div>`
}

export const nothingHereIndex = () => {

    return `<div class="nothing-here">
    <p>OOOPS... Looks like there's nothing here...</p>

    <p>Try adding a</p> <a href="/newProduct.html">New product</a>

    <img src="/img/matojo.gif">
</div>`;

}

export const nothingHereDetails = () => {

    return `<div class="nothing-here">
    <p>OOOPS... Looks like there's nothing here...</p>

    <img src="/img/matojo.gif">
</div>`;

}

export const editProduct = (product) => {
    let selling = '';
    let buying = '';
    let food = '';
    let tech = '';
    let sports = '';
    let other = '';

    if (product.tags) {
        product.tags.forEach(tag => {
            switch (tag) {
                case 'Food':
                    food = 'checked';
                    break;
                case 'Tech':
                    tech = 'checked';
                    break;
                case 'Sports':
                    sports = 'checked'
                    break;
                case 'Other':
                    other = 'checked'
                    break;
            }
        });
    }

    if (product.sellBuy == 'Selling') {
        selling = 'checked';
    } else {
        buying = 'checked';
    }
    return `<div>
    <p>Fill the fields</p>
    <div class="editOptions">
        <form action="">
            <div>
                <label for="name">Name</label>
                <input type="text" name="name" id="name" value="${product.name}" required>
            </div>
            <div>
                <label for="price">Price</label>
                <input type="number" name="price" id="price" autocomplete="off" value="${product.price}" required>
            </div>
            <div>
                <label for="description">Description</label>
                <textarea name="description" id="description" rows="10" style="resize: vertical;"
                    required>${product.description}</textarea>
            </div>
            <div class="editTags">
                <p>Tags</p>
                <div>
                    <div><label for="food">Food</label>
                        <input type="checkbox" class="checkbox" name="tags" id="food" ${food} value="Food">
                    </div>
                    <div><label for="tech">Tech</label>
                        <input type="checkbox" class="checkbox" name="tags" id="tech" ${tech} value="Tech">
                    </div>
                    <div><label for="sports">Sports</label>
                        <input type="checkbox" class="checkbox" name="tags" id="sports" ${sports} value="Sports">
                    </div>
                    <div><label for="other">Other</label>
                        <input type="checkbox" class="checkbox" name="tags" id="other" ${other} value="Other">
                    </div>
                </div>

            </div>
            <div>
                <label for="sell">Selling</label>
                <input type="radio" name="sellBuy" id="sell" value="Selling" class="radio" ${selling} required>
                <label for="buy">Buying</label>
                <input type="radio" name="sellBuy" id="buy" value="Buying" class="radio" ${buying}>
            </div>
            <div>
                <input type="file" name="file" accept="image/*">
            </div>

            <div class="editButtons">
                <div class="cancelEditButton">Cancel</div>
                <button class="editButton">Edit product</button>
            </div>
        </form>
    </div>

</div>`
}

export const deleteProduct = () => {
    return `<div>
    <p>Are you sure you want to delete this product?</p>
    <div class="deleteOptions">
        <div class="cancel">Cancel</div>
        <div class="deleteProduct">Delete</div>
    </div>

</div>`
}