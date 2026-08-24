import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { HomePage } from "./pages/HomePage";
import "./App.css";
import { Routes, Route } from "react-router";
import { Checkout } from "./pages/Checkout";
import { Orders } from "./pages/Orders";
import { Header } from "./components/Header";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async() => {
    const response = await axios.get("http://localhost:3000/api/cart-items?expand=product");
    setCart(response.data);
};
  useEffect(() => {

    loadCart();
  }, []);

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route index element={<HomePage loadCart={loadCart}/>} />
        <Route path="checkout" element={<Checkout cart={cart} loadCart={loadCart}/>} />
        <Route path="orders" element={<Orders cart={cart} />} />
      </Routes>
    </>
  );
}

export default App;
