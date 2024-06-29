// 添加商品到购物车
function addToCart(button) {
    const card = button.closest('.card');
    const name = card.getAttribute('data-name');
    const price = card.getAttribute('data-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));

    // 显示提示信息
    alert(`${name} 已添加到购物车！`);
}

// 显示购物车中的商品
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');

    cartItemsContainer.innerHTML = ''; // 清空容器

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="name">${item.name}</div>
            <div class="price">RM ${item.price}</div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// 页面加载时显示购物车中的商品
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.cart-items')) {
        displayCartItems();
    }
});
