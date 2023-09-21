// Cart Open Close
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
	cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
	cart.classList.remove("active");
};
