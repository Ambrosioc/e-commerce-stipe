import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";

// Load variable
dotenv.config();

// Start Server
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
	res.sendFile("index.html", { root: "public" });
});
// Success
app.get("/success", (req, res) => {
	res.sendFile("success.html", { root: "public" });
});
// Cancel
app.get("/cancel", (req, res) => {
	res.sendFile("cancel.html", { root: "public" });
});

// Stripe
let stripeGateway = stripe(process.env.STRIPE_API_KEY);
let DOMAIN = process.env.DOMAIN;

app.post("/stripe-checkout", async (req, res) => {
	const lineItems = req.body.items.map((item) => {
		const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
		console.log(item.title, item.price, item.productImg);
		console.log("unitAmount:", unitAmount);
		return {
			price_data: {
				currency: "eur",
				product_data: {
					name: item.title,
					images: [item.productImg],
				},
				unit_amount: unitAmount,
			},
			quantity: item.quantity,
		};
	});
	console.log(lineItems);

	// Create checkout session
	const session = await stripeGateway.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "payment",
		success_url: `${DOMAIN}/success`,
		cancel_url: `${DOMAIN}/cancel`,
		line_items: lineItems,
		// Asking adress in stripe checkout page
		billing_address_collection: "required",
	});
	res.json(session.url);
});

app.listen(3000, () => {
	console.log("prot 3000");
});
