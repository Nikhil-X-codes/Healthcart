function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.querySelectorAll('.product-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productBox = button.closest('.product-box');
        const product = {
            image: productBox.querySelector('.product-image').src,
            title: productBox.querySelector('.product-title').innerText,
            price: productBox.querySelector('.product-price').innerText,
        };
        addToCart(product);
    });
});
