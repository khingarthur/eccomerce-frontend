import { formatMoney } from "../utils/money";
import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export const Checkout = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  // fetch delivery options
  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);

      const response2 = await axios.get(
        "http://localhost:3000/api/payment-summary",
      );
      setPaymentSummary(response2.data);
    };

    fetchDeliveryOptions();
  }, [cart]);

  let totalQuantity = 0;
  cart.map((item) => {
    totalQuantity += item.quantity;
  });

  const updateDeliveryOption = async (cartItem, deliveryOption) => {
    await axios.put(
      `http://localhost:3000/api/cart-items/${cartItem.productId}`,
      {
        deliveryOptionId: deliveryOption.id,
      },
    );

    loadCart();
  };

  const deleteCartItem = async(cartItem) =>{
    await axios.delete(`http://localhost:3000/api/cart-items/${cartItem.productId}`);
    await loadCart()
  }

  const navigate = useNavigate();
  const handleOrder = async() =>{
    await axios.post("http://localhost:3000/api/orders")
    await loadCart
    navigate("/orders")
  }

  return (
    <div>
      <title>KC|Checkout</title>

      {/* second header */}
      <div className="flex-1 flex justify-center mt-4">
        <h3 className="font-bold text-xl">
          Checkout (
          <span className="text-green-600 font-bold">
            {totalQuantity} Items
          </span>
          )
        </h3>
      </div>

      <main className="min-h-screen mt-20 container mx-auto px-5">
        <h1 className="mb-4 text-2xl font-bold">Review your order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* left */}
          {deliveryOptions.length > 0 &&
            cart.map((cartItem) => {
              const selectedDeliveryOption = deliveryOptions.find(
                (deliveryOption) => {
                  return deliveryOption.id === cartItem.deliveryOptionId;
                },
              );

              return (
                <div key={cartItem.id} className="flex flex-col gap-2">
                  {/* 1st */}
                  <div className="shadow-md px-4 py-4">
                    <h3 className="py-2 text-xl font-bold text-green-600">
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs,
                      ).format("dddd, MMMM D")}
                    </h3>

                    <div className="flex gap-8 justify-between">
                      <div className="flex gap-4">
                        <div>
                          <img
                            className="w-24"
                            src={cartItem.product.image}
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="font-bold">{cartItem.product.name} </p>
                          <p className="font-bold">
                            {formatMoney(cartItem.product.priceCents)}
                          </p>
                          <p className="text-gray-600 font-bold">
                            Quantity: <span>{cartItem.quantity}</span>
                          </p>

                          <div className="flex gap-1">
                            <button className="bg-green-500 px-1 rounded-l hover:bg-green-700 hover:text-white">
                              update
                            </button>
                            <button onClick={() => deleteCartItem(cartItem)} className="bg-green-500 px-1 rounded-l hover:bg-green-700 hover:text-white">
                              delete
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <h3 className="font-bold">Choose a delivery option</h3>
                        {deliveryOptions.map((deliveryOption) => {
                          const shippingFee =
                            deliveryOption.priceCents > 0
                              ? `${formatMoney(deliveryOption.priceCents)} - Shipping`
                              : "Free Shipping";
                          return (
                            <div
                              key={deliveryOption.id}
                              className=""
                              onClick={() =>
                                updateDeliveryOption(cartItem, deliveryOption)
                              }
                            >
                              <label className="flex gap-1">
                                <input
                                  type="radio"
                                  id="first-date"
                                  name={cartItem.product.id}
                                  checked={
                                    deliveryOption.id ===
                                    cartItem.deliveryOptionId
                                  }
                                  onChange={() => {}}
                                />
                                <div className="">
                                  <p className="h-5 font-bold">
                                    {dayjs(
                                      deliveryOption.estimatedDeliveryTimeMs,
                                    ).format("dddd, MMMM D")}
                                  </p>
                                  <p className=" text-gray-600">
                                    {shippingFee}
                                  </p>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* right Payment Summary */}
          {paymentSummary && (
            <div className="shadow-md px-2 max-w-90">
              <h3 className="font-bold text-xl">Payment Sumary</h3>

              <div className="flex justify-between font-bold text-gray-600">
                <div>
                  <p className="text-gray-600 font-bold">
                    Items({paymentSummary.totalItems})
                  </p>
                  <p>Shipping and handling</p>
                  <p>Total before tax</p>
                  Estimated tax (10%)
                </div>
                <div>
                  <p>{formatMoney(paymentSummary.productCostCents)}</p>
                  <p>{formatMoney(paymentSummary.shippingCostCents)}</p>
                  <p className="border-b"></p>
                  <p>{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</p>
                  <p>{formatMoney(paymentSummary.taxCents)}</p>
                </div>
              </div>

              <p className="border-b"></p>
              <div className="flex flex-col">
                <div className="flex justify-between text-xl font-bold text-green-600">
                  <p>Oder total: </p>
                  <p>{formatMoney(paymentSummary.totalCostCents)}</p>
                </div>
                <button onClick={handleOrder} className=" bg-green-600 m-4 py-2 rounded-sm hover:bg-green-800 hover:text-white ">
                  Place your order
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
