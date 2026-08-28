import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    const savedCart = saved ? JSON.parse(saved) : [];

    return savedCart.map((item) => ({
      ...item,
      product: item.product || item,
      productId: item.productId || item.id,
      deliveryOptionId: item.deliveryOptionId || "1",
    }));
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const productDetails = product.product || product;
    const productId = productDetails.id || product.productId;

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          product: productDetails,
          productId,
          quantity,
          deliveryOptionId: "1",
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateDeliveryOption = (deliveryOptionId) => {
    setCart((prev) => prev.map((item) => ({ ...item, deliveryOptionId })));
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateDeliveryOption,
    clearCart,
  };
}
