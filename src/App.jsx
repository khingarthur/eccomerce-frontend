import { lazy, Suspense, useState, useEffect } from "react";

import { HomePage } from "./pages/HomePage";
import "./App.css";
import { Routes, Route } from "react-router";
import { Navigation } from "./components/Navigation";
import axios from "axios";
import { useCart } from "./hooks/useCart";

const Checkout = lazy(() => import("./pages/Checkout").then((module) => ({ default: module.Checkout })));
const Orders = lazy(() => import("./pages/Orders").then((module) => ({ default: module.Orders })));
const Tracking = lazy(() => import("./pages/Tracking").then((module) => ({ default: module.Tracking })));
const ContactMe = lazy(() => import("./pages/ContactMe").then((module) => ({ default: module.ContactMe })));
const Categories = lazy(() => import("./pages/Categories").then((module) => ({ default: module.Categories })));
const Account = lazy(() => import("./pages/Account").then((module) => ({ default: module.Account })));
const NotFound = lazy(() => import("./pages/NotFound").then((module) => ({ default: module.NotFound })));

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
      const response = await axios.get(`${API_URL}/products`, {
        headers: { "Cache-Control": "max-age=300" },
      });
      setProducts(response.data);
      setIsProductsLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <main className="flex min-h-screen items-center justify-center bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#1E293B]" />
          </main>
        }
      >
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
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Navigation cart={cart} />
    </>
  );
}

export default App;
