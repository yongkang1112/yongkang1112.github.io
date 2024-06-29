document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});

function addToCart(button) {
    const card = button.closest('.card');
    const product = card.querySelector('img').src;
    const itemName = card.querySelector('.name').innerText;
    const itemPrice = card.querySelector('.price').innerText;

    const newItem = {
        product: product,
        name: itemName,
        price: itemPrice,
        quantity: atc1
    };

    let addtocart = JSON.parse(localStorage.getItem('addtocart')) || [];

    const existingItem = addtocart.find(item => item.name === itemName);
    if (!existingItem) {
        newItem.quantity = 1;
        addtocart.push(newItem);
        localStorage.setItem('addtocart', JSON.stringify(addtocart));
        atc1 += 1;
        alert(`"${itemName}" added to cart successfully.`);
    } else {
        existingItem.quantity += 1;
        localStorage.setItem('addtocart', JSON.stringify(addtocart));
        atc1 += 1;
        alert(`"${itemName}" added to cart successfully.`);
    }
}

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
                <img src="${item.product}" alt="${item.name}" class="cart-item-image">
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
