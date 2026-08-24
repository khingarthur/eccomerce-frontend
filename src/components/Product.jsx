import { useState, useRef } from "react";
import { formatMoney } from "../utils/money";

export const Product = ({ product, addToCart }) => {
  // for quantity controlled input
  const [quantity, setQuantity] = useState(1);
  const timerRef = useRef(null);

  function quantitySelect(event) {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  }

  // for added to cart message
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className="w-50 mb-3 flex flex-col transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <img src={product.image} className=" object-fill rounded-xl" alt="" />
      <div className="pl-2 mt-8">
        <p className="flex items-center justify-center mb-2 font-bold">
          {product.name}
        </p>

        <div className="flex gap-2 items-center">
          <img
            src={`images/ratings/rating-${product.rating.stars * 10}.png`}
            className="w-30"
          />

          <span className="w-30 pt-1">{product.rating.count}</span>
        </div>

        <div className="pl-1.5">
          <p className="font- bold">${formatMoney(product.priceCents)}</p>
          <label htmlFor="quantitySelect"></label>
          <select
            value={quantity}
            onChange={quantitySelect}
            name="quantitySelect"
            id="quantitySelect"
            className="border-2"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="relative flex justify-center mb-4 mt-8">
        {isAdded && (
          <div className="absolute -top-8 text-green-600 font-bold flex items-center gap-1 transition-opacity">
            {" "}
            ✓ Added To Cart
          </div>
        )}
        <button
          className="bg-green-500 px- w-2/3 h-8 rounded-sm text-sm  hover:bg-green-700 hover:text-amber-50"

          onClick={() => {
            addToCart(product, quantity);
            setIsAdded(true);

            // Clear any existing timer
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }

            // Hide the message after 2 seconds
            timerRef.current = setTimeout(() => {
              setIsAdded(false);
            }, 2000);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
