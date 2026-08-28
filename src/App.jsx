import { useState, useEffect } from "react";

import { HomePage } from "./pages/HomePage";
import "./App.css";
import { Routes, Route } from "react-router";
import { Checkout } from "./pages/Checkout";
import { Orders } from "./pages/Orders";
import { Navigation } from "./components/Navigation";
import { Tracking } from "./pages/Tracking";
import { ContactMe } from "./pages/ContactMe";
import { Categories } from "./pages/Categories";
import axios from "axios";
import { useCart } from "./hooks/useCart";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api`;

function App() {
  const { cart, addToCart, removeFromCart, updateDeliveryOption, clearCart } =
    useCart();
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  const [deviceId] = useState(() => {
    const savedDeviceId = localStorage.getItem("device_id");
    const newDeviceId = savedDeviceId || crypto.randomUUID();
    localStorage.setItem("device_id", newDeviceId);
    return newDeviceId;
  });

  useEffect(() => {
    const loadProducts = async () => {
      setIsProductsLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setIsProductsLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <HomePage
              products={products}
              isLoading={isProductsLoading}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              deviceId={deviceId}
              removeFromCart={removeFromCart}
              updateDeliveryOption={updateDeliveryOption}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <Categories
              products={products}
              isLoading={isProductsLoading}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/orders"
          element={<Orders deviceId={deviceId} addToCart={addToCart} />}
        />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/contactme" element={<ContactMe />} />
      </Routes>
      <Navigation cart={cart} />
    </>
  );
}

export default App;
