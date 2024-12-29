import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios("https://dummyjson.com/products");
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div >
      <h1>Product List</h1>
      <div className="container mx-auto">
        {products.length > 0 ? (
          <div className="flex  justify-between flex-wrap">
            {products.map((product) => (
              <Card
                productName={product.title}
                thumbnail={product.thumbnail}
                discountPercentage={product.discountPercentage}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
