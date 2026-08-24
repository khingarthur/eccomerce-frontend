import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatMoney } from "../utils/money";
import { Product } from "../components/Product";


export const HomePage = ({loadCart}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  // Add to cart implementation
  async function addToCart(product, quantity){
    console.log("Add to cart")
    await axios.post("http://localhost:3000/api/cart-items", {
      productId: product.id,
      quantity: quantity
    })
    loadCart()
  }


  return (
    <>
      <title>KOBBYCommerce</title>

      <main className="bg-gray-200 w-full min-h-screen gap-2 flex-wrap flex justify-center items-center py-15">

        {/* card */}
        {products.map((product) => {
          return (
            <Product key={product.id} product={product} addToCart={addToCart}/>
          );
        })}
      </main>
    </>
  );
};
