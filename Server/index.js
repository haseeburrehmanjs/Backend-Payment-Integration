import express from "express";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QZxUzBHinCJTrQELEJ1k9SqAtpypd9dKgaXARtZyMX5wub1guuKZ9PsQv1ecsLObZodPK7nZkGu1ql9t0ExzEEi008qtRkgYx"
);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/api/v1/checkout", async (req, res) => {
    const response = req.body;
    console.log(response);

    const lineItems = response.products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.dish,
        },
        unit_amount: product.price * 100, // Convert price to cents
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Correct key name
      line_items: lineItems,
      mode: 'payment',
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
    console.error("Error creating checkout session:", error);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
