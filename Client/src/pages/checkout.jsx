import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Checkout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("cartitem");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
      }
    }
  }, []);

  const payNow = async () => {
    try {
      const stripe = await loadStripe('pk_test_51QZxUzBHinCJTrQEY1cccx09WFzL4PoJaFwUnVhb9MNn8LUym9khyTfDTHfihwqcyu8Jp3LOnpi61KDcNr6dLEbR00LWsWliFN');
  
      const response = await axios.post("http://localhost:3000/api/v1/checkout", {
        products: data,
      });
  
      console.log(response.data.id);
  
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
  
      if (result.error) {
        console.error("Stripe checkout error:", result.error.message);
      }
    } catch (error) {
      console.error("Error in payNow:", error);
    }
  };
  

  return (
    <div>
      {data.length > 0 ? (
        <div className="flex justify-center flex-wrap container mx-auto">
          {data.map((item, index) => (
            <Card
              key={index}
              productName={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              discountPercentage={item.discountPercentage}
            />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div
        style={{
          textAlign: "center",
          margin: "50px",
        }}
      >
        <button onClick={payNow}>Pay Now</button>
      </div>
    </div>
  );
};

export default Checkout;
