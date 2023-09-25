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

	loadCartItems();
}

// Remove Cart Item
function removeCartItem(event) {
	const buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updateTotal();
	saveCartItme();
	updateCartIcon();
}
// Quantity Change
function quantityChange(event) {
	const input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateTotal();
	saveCartItme();
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
	saveCartItme();
	updateCartIcon();
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

	cartItems.append(cartShopBox);
	cartShopBox
		.getElementsByClassName("cart-remove")[0]
		.addEventListener("click", removeCartItem);

	cartShopBox
		.getElementsByClassName("cart-quantity")[0]
		.addEventListener("change", quantityChange);
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
	localStorage.setItem("cartTotal", total);
	updateCartIcon();
}

// LocalStorage
function saveCartItme() {
	const cartContent = document.getElementsByClassName("cart-content")[0];
	const cartBoxes = cartContent.getElementsByClassName("cart-box");
	let cartItems = [];
	for (let i = 0; i < cartBoxes.length; i++) {
		const cartBox = cartBoxes[i];
		const titleElement =
			cartBox.getElementsByClassName("cart-product-title")[0];
		const priceElement = cartBox.getElementsByClassName("cart-price")[0];
		const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
		console.log(quantityElement);
		const productImg = cartBox.getElementsByClassName("cart-img")[0].src;

		const item = {
			title: titleElement.innerText,
			price: priceElement.innerText,
			quantity: quantityElement.value,
			productImg: productImg,
		};
		cartItems.push(item);
	}
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
//  Loads In cart
function loadCartItems() {
	const cartItemsOnSrorage = localStorage.getItem("cartItems");
	if (cartItemsOnSrorage) {
		const cartItems = JSON.parse(cartItemsOnSrorage);
		console.log(cartItems);

		for (let i = 0; i < cartItems.length; i++) {
			const item = cartItems[i];
			addProductToCart(item.title, item.price, item.productImg);

			const cartBoxes = document.getElementsByClassName("cart-box");
			const cartBoxe = cartBoxes[cartBoxes.length - 1];
			const quantityElement =
				cartBoxe.getElementsByClassName("cart-quantity")[0];
			quantityElement.value = item.quantity;
		}
	}
	const cartTotal = localStorage.getItem("cartTotal");
	console.log("cartTotal", cartTotal);
	if (cartTotal) {
		document.getElementsByClassName("total-price")[0].innerText =
			"$" + cartTotal;
	}
	updateCartIcon();
}

// Quandtity In Cart Icon
function updateCartIcon() {
	const cartBoxes = document.getElementsByClassName("cart-box");
	let quantity = 0;
	for (let i = 0; i < cartBoxes.length; i++) {
		const cartBox = cartBoxes[i];
		const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
		quantity += parseInt(quantityElement.value);
	}
	const cartIcon = document.querySelector("#cart-icon");
	cartIcon.setAttribute("data-quantity", quantity);
}
