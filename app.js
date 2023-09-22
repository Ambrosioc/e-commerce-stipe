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
//  Making add to cart
// Cart Working JS
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}

// Making Finction
function ready() {
	// Remove Item for Cart
	const removeCartButtons = document.getElementsByClassName("cart-remove");
	for (let i = 0; i < removeCartButtons.length; i++) {
		const button = removeCartButtons[i];
		button.addEventListener("click", removeCartItem);
	}
	// Quantity change
	const quantityInput = document.getElementsByClassName("cart-quantity");
	for (let i = 0; i < quantityInput.length; i++) {
		const button = quantityInput[i];
		button.addEventListener("change", quantityChange);
	}
	// Add to Cart
	const addCarts = document.getElementsByClassName("add-cart");
	for (let i = 0; i < addCarts.length; i++) {
		const button = addCarts[i];
		button.addEventListener("click", addCartClicked);
	}
}

// Remove Cart Item
function removeCartItem(event) {
	const buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updateTotal();
}
// Quantity Change
function quantityChange(event) {
	const input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateTotal();
}

// Add Cart function
function addCartClicked(event) {
	const button = event.target;
	const shopProducts = button.parentElement;
	const title =
		shopProducts.getElementsByClassName("product-title")[0].innerText;
	const price = shopProducts.getElementsByClassName("price")[0].innerText;
	const productImg = shopProducts.getElementsByClassName("product-img")[0].src;
	addProductToCart(title, price, productImg);
	updateTotal();
}

function addProductToCart(title, price, productImg) {
	const cartShopBox = document.createElement("div");
	cartShopBox.classList.add("cart-box");
	const cartItems = document.getElementsByClassName("cart-content")[0];
	const cartItmesNames = document.getElementsByClassName("cart-product-title");
	for (let i = 0; i < cartItmesNames.length; i++) {
		if (cartItmesNames[i].innerText == title) {
			alert("You have already added this item to cart");
			return;
		}
	}
	const contentelement = `<img src="${productImg}" alt="" class="cart-img" />
							<div class="detail-box">
								<div class="cart-product-title">${title}</div>
								<div class="cart-price">${price}</div>
								<input
									type="number"
									name=""
									id=""
									value="1"
									class="cart-quantity" />
							</div>
							<i class="bx bxs-trash-alt cart-remove"></i>`;
	cartShopBox.innerHTML = contentelement;
	console.log(cartShopBox);
	cartItems.append(cartShopBox);
	cartShopBox
		.getElementsByClassName("cart-remove")[0]
		.addEventListener("click", removeCartItem);
}

//  Update Total
function updateTotal() {
	const cartCentent = document.getElementsByClassName("cart-content")[0];
	const cartBoxes = cartCentent.getElementsByClassName("cart-box");

	let total = 0;
	for (let i = 0; i < cartBoxes.length; i++) {
		const cartBoxe = cartBoxes[i];
		const priceElement = cartBoxe.getElementsByClassName("cart-price")[0];
		const quantity = cartBoxe.getElementsByClassName("cart-quantity")[0].value;
		const price = parseFloat(priceElement.innerText.replace("$", ""));

		total += price * quantity;
	}
	// If price contain some cents
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

//
