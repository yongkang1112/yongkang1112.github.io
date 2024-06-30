document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});
// diaplay the item in the cart
function displayCartItems() {
    // save in localStorage
    let cartItems = JSON.parse(localStorage.getItem('addtocart')) || [];

    // get cart-item
    let cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; 

    // if no thing in cart
    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';

    // add the item in cart
    } else {
        // create the box for item
        cartItems.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.product}" alt="${item.name}" class="image">
                </div>
                
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <div class="q">Quantity: ${item.quantity}</div>
                    <button onclick="deleteItem('${item.name}')">Delete from cart</button>
                </div>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
}

// delete item
function deleteItem(name) {
    let addtocart = JSON.parse(localStorage.getItem('addtocart')) || [];
    const index = addtocart.findIndex(item => item.name === name);

    // item amount -1
    if (index !== -1) {
        if (addtocart[index].quantity > 1) {
            addtocart[index].quantity -= 1;
        
        // Remove the item from array if quantity is 0
        } else {
            addtocart.splice(index, 1); 
        }
        localStorage.setItem('addtocart', JSON.stringify(addtocart));
        displayCartItems(); // Refresh the displayed cart items
    }
}
