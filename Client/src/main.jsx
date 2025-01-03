import { createRoot } from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./pages/checkout.jsx";
import Home from "./pages/home.jsx";
import Layout from "./layout.jsx";
import Cancel from "./pages/cancel.jsx";
import Success from "./pages/success.jsx";

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'cancel',
        element: <Cancel />,
      },
      {
        path: 'success',
        element: <Success />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
