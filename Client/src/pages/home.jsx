import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [checkOutData, setCheckOutData] = useState([]);

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

  const CheckOut = (index) => {
    checkOutData.push(products[index]);
    setCheckOutData([...checkOutData]);
    localStorage.setItem('cartitem', JSON.stringify(checkOutData))
    console.log(checkOutData);
  };

  return (
    <div>
      <div className="size-10 fixed bottom-10 text-white right-10 z-20 bg-pink-500 rounded-full flex items-center justify-center">
        <Link to="checkout">{checkOutData.length}</Link>
      </div>
      <div>
        <h1>Product List</h1>
      </div>
      <div className="container mx-auto">
        {products.length > 0 ? (
          <div className="flex justify-center flex-wrap">
            {products.map((product, index) => (
              <Card
              key={index}
                productName={product.title}
                thumbnail={product.thumbnail}
                discountPercentage={product.discountPercentage}
                price={product.price}
                btnData={
                  <a
                    onClick={() => CheckOut(index)}
                    className="cursor-pointer flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to cart
                  </a>
                }
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

export default Home;
