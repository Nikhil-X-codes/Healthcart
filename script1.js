document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn');
    const cartIcon = document.querySelector('.image1');
    const cartSidebar = document.getElementById('cart-sidebar'); 

    btn.addEventListener('click', () => {
        window.location.href = 'products.html';
    });

    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.toggle('active'); 
    });

    function updateCart() {
        cartSidebar.innerHTML = `
            <h2 style="text-align: center; margin: 10px 0;">Your Cart</h2>
            <div id="cart-items" style="max-height: 300px; overflow-y: auto; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin: 10px;">
            </div>
            <h3 id="total-price" style="text-align: center; margin-top: 20px;">Total Price: $0.00</h3>
        `;

        const cartItemsContainer = document.getElementById('cart-items');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const cartItemHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; border-radius: 5px; margin-right: 10px;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 16px;">${item.title}</h4>
                        <p style="margin: 5px 0; color: #666;">Price: ${item.price}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}" style="background-color: #e74c3c; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">
                        Remove
                    </button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
            totalPrice += parseFloat(item.price.replace('$', ''));
        });

        document.getElementById('total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;

        document.querySelectorAll('.remove-btn').forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCart();
    }

    updateCart();
});