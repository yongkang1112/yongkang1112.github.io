document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});

function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('addtocart')) || [];

    let cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; 

    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${item.aj1}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="deleteItem('${item.name}')">Delete from cart</button>
                </div>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
    calculate();
}

function deleteItem(name) {
    let addtocart = JSON.parse(localStorage.getItem('addtocart')) || [];
    const index = addtocart.findIndex(item => item.name === name);

    if (index !== -1) {
        if (addtocart[index].quantity > 1) {
            addtocart[index].quantity -= 1;
        } else {
            addtocart.splice(index, 1); // Remove the item from array if quantity is 0
        }
        localStorage.setItem('addtocart', JSON.stringify(addtocart));
        displayCartItems(); // Refresh the displayed cart items
    }
}
