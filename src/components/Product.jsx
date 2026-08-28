import { useState, useRef } from "react";
import { formatMoney } from "../utils/money";

export const Product = ({ product, addToCart }) => {
  // for quantity controlled input
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const timerRef = useRef(null);

  function quantitySelect(event) {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  }

  // Handle add to cart with show added message
  const handleShowIsAdded = (product, quantity = 1) => {
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
  };

  // show is added implementation
  return (
    <div className="font-manrope bg-[#F4F7F9] text-[#1E293B] transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl rounded-xl overflow-hidden border border-[#DCE8EA]">
      <img
        src={product.image}
        className="h-40 w-full p-1 object-contain mix-blend-multiply"
        alt=""
      />
      <div className="pl-2 mt-2">
        <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>

        <div className="text-center text-sm flex  items-center">
          <img
            src={`images/ratings/rating-${product.rating.stars * 10}.png`}
            className="w-15"
          />

          <span className="w-30 pt-1">{product.rating.count}</span>
        </div>

        <div className="pl-1.5">
          <p className="text-base font-semibold">
            ${formatMoney(product.priceCents)}
          </p>
          <label htmlFor="quantitySelect"></label>
          <select
            value={quantity}
            onChange={quantitySelect}
            name="quantitySelect"
            id="quantitySelect"
            className="border rounded-md border-[#1E293B] text-sm "
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="relative flex justify-center mb-2 mt-2">
        {isAdded && (
          <div className="absolute -top-4 text-xs text-[#14B8A6] flex items-center gap-1 transition-opacity">
            ✓ Added To Cart
          </div>
        )}
        <button
          className="rounded-md bg-[#15183a] px-8 py-1 text-sm !font-extrabold text-white hover:bg-[#1E293B]"
          onClick={() => handleShowIsAdded(product, quantity)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
