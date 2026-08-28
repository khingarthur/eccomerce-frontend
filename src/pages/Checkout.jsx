import { formatMoney } from "../utils/money";
import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { Header2 } from "../components/Header2";
import { PageMeta } from "../utils/PageMeta";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api`;
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const Checkout = ({
  cart,
  deviceId,
  removeFromCart,
  updateDeliveryOption,
  clearCart,
}) => {
  const heading = "Your Cart";

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] =
    useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isPaystackReady, setIsPaystackReady] = useState(() =>
    Boolean(window.PaystackPop),
  );
  const [paystackLoadError, setPaystackLoadError] = useState(false);
  const [email, setEmail] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [pendingPaymentReference, setPendingPaymentReference] = useState(() =>
    localStorage.getItem("pending_payment_reference"),
  );
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (window.PaystackPop) {
      return;
    }

    const paystackScript = document.createElement("script");
    paystackScript.src = "https://js.paystack.co/v1/inline.js";
    paystackScript.async = true;
    paystackScript.onload = () => setIsPaystackReady(true);
    paystackScript.onerror = () => setPaystackLoadError(true);
    document.body.appendChild(paystackScript);

    return () => {
      paystackScript.onload = null;
    };
  }, []);

  // fetch delivery options
  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/delivery-options?expand=estimatedDeliveryTime`,
        { headers: { "Cache-Control": "max-age=60" } },
      );
      setDeliveryOptions(response.data);

      setIsLoading(false);
    };

    fetchDeliveryOptions();
  }, []);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const productCostCents = cart.reduce(
    (total, item) => total + item.product.priceCents * item.quantity,
    0,
  );
  const shippingCostCents = cart.reduce((total, item) => {
    const option = deliveryOptions.find(
      (deliveryOption) => deliveryOption.id === item.deliveryOptionId,
    );
    return total + (option?.priceCents || 0);
  }, 0);
  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  const paymentSummary = {
    totalItems: totalQuantity,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents: totalCostBeforeTaxCents + taxCents,
  };

  const activeDeliveryOptionId =
    selectedDeliveryOptionId ?? cart[0]?.deliveryOptionId;

  const selectedDeliveryOption = deliveryOptions.find(
    (deliveryOption) => deliveryOption.id === activeDeliveryOptionId,
  );

  const chooseDeliveryOption = (deliveryOptionId) => {
    setSelectedDeliveryOptionId(deliveryOptionId);
    updateDeliveryOption(deliveryOptionId);
  };

  const deleteCartItem = async (cartItem) => {
    removeFromCart(cartItem.productId);
  };

  const navigate = useNavigate();

  const savePaidOrder = async (reference) => {
    setPaymentError("");
    try {
      await axios.post(`${API_URL}/orders/verify-payment`, {
        reference,
        deviceId,
        cart,
      });
      localStorage.removeItem("pending_payment_reference");
      setPendingPaymentReference(null);
      clearCart();
      navigate("/orders");
    } catch (error) {
      const message = error.response?.data?.error;
      setPaymentError(
        message ||
          "Payment was made, but the order could not be saved. Please contact support with your payment reference.",
      );
    } finally {
      setIsPaying(false);
    }
  };

  const handleOrder = () => {
    if (!email.trim()) {
      setPaymentError("Enter your email before paying.");
      return;
    }

    if (!PAYSTACK_PUBLIC_KEY) {
      setPaymentError("Payment is not configured. Please contact support.");
      return;
    }

    if (paystackLoadError) {
      setPaymentError(
        "Paystack could not load. Check your internet connection.",
      );
      return;
    }

    if (!isPaystackReady || !window.PaystackPop?.setup) {
      setPaymentError("Payment is still loading. Please try again.");
      return;
    }

    setPaymentError("");
    setIsPaying(true);

    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email.trim(),
        amount: paymentSummary.totalCostCents,
        currency: "GHS",

        // Using a standard function to pass Paystack's strict validator
        callback: function (response) {
          localStorage.setItem("pending_payment_reference", response.reference);
          setPendingPaymentReference(response.reference);
          savePaidOrder(response.reference);
        },

        // Standard function for onClose as well
        onClose: function () {
          setIsPaying(false);
          setPaymentError("");
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Paystack could not start:", error);
      setIsPaying(false);
      setPaymentError("Paystack could not start. Check your public key.");
    }
  };

  if (cart && cart.length === 0) {
    return (
      <>
        <Header2 heading={heading} />
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-5 text-center text-[#1E293B]">
          <span className="material-symbols-outlined text-6xl text-[#14B8A6]">
            shopping_cart
          </span>
          <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-[#14B8A6]">
            Add some products before checking out.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-lg bg-[#15183a] px-5 py-3 font-semibold text-white hover:bg-[#0F766E]"
          >
            Continue shopping
          </button>
        </main>
      </>
    );
  }

  if (isLoading === true) {
    return (
      <>
        <Header2 heading={heading} />
        <main className="bg-white text-[#1E293B] py-12 px-4 flex flex-col items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1E293B] rounded-full animate-spin"></div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header2 heading={heading} />
      <div className="font-manrope bg-white text-[#1E293B] pb-20 min-h-screen">
        <PageMeta
          title="Checkout | Assorted Happy Shopping"
          description="Review your cart and securely complete your order."
        />

        {/* second header */}
        <div className="flex-1 flex justify-center mt-4">
          <h3 className="text-xl font-semibold tracking-tight">
            Checkout (
            <span className="font-semibold text-[#14B8A6]">
              {totalQuantity} Items
            </span>
            )
          </h3>
        </div>

        <main className="min-h-screen mt-20 container mx-auto px-5">
          <h1 className="mb-4 text-2xl font-bold tracking-tight">
            Review your order
          </h1>

          {selectedDeliveryOption && cart.length > 0 && (
            <section className="mb-4 rounded-xl bg-[#15183a] px-3 py-3 text-white shadow-md">
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <h2 className="font-semibold">Order Summary</h2>
                <span className="text-sm font-semibold">
                  {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
                </span>
              </div>

              <div className="flex items-center gap-2 border-b border-white/20 py-2 text-xs">
                <span className="material-symbols-outlined text-sm">
                  calendar_month
                </span>
                <span>
                  {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D",
                  )}
                </span>
              </div>

              <div className="flex justify-between border-t border-white/20 pt-2 text-xs font-semibold">
                <span>Subtotal ({totalQuantity} Items)</span>
                <span>
                  {formatMoney(paymentSummary?.productCostCents ?? 0)}
                </span>
              </div>
            </section>
          )}

          <div className="flex flex-col gap-4">
            {/* left */}
            <div className="flex flex-col gap-4 bg-[#F4F7F9] shadow-md rounded-xl px-4 py-4 border border-[#DCE8EA]">
              {selectedDeliveryOption &&
                cart.map((cartItem) => {
                  return (
                    <div
                      key={cartItem.productId}
                      className="flex flex-col gap-2"
                    >
                      {/* 1st */}

                      {/* Product Details */}
                      <div className="flex items-center p-2 gap-4 bg-[#15183a] rounded-lg">
                        <div>
                          <img
                            className="w-36 rounded"
                            src={cartItem.product.image}
                            loading="lazy"
                            decoding="async"
                            alt={cartItem.product.name}
                          />
                        </div>
                        <div className="text-white flex flex-col text-sm">
                          <p className=" line-clamp-1 ">
                            {cartItem.product.name}
                          </p>
                          <div className="flex gap-4">
                            <p className="">
                              ${formatMoney(cartItem.product.priceCents)}
                            </p>
                            <span>|</span>
                            <p className="">
                              Quantity: <span>{cartItem.quantity}</span>
                            </p>
                          </div>

                          <div className="flex gap-5 pt-2">
                            <button className="border-2 text-white px-4 rounded-md hover:bg-[#1E293B]">
                              update
                            </button>
                            <button
                              onClick={() => deleteCartItem(cartItem)}
                              className="border-2 border-white px-4 rounded-md text-[#DC2626] hover:bg-[#1E293B]"
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Delivery Options */}
              {deliveryOptions.length > 0 && (
                <div className="shrink-0">
                  <h3 className="flex items-center font-bold gap-2 text-[#1E293B]">
                    <span className="material-symbols-outlined text-[#14B8A6]">
                      local_shipping
                    </span>{" "}
                    Choose a delivery option
                  </h3>

                  {/* 1. The Container: Relative positioning goes OUTSIDE the loop */}
                  <div className="relative flex flex-col gap-3 mt-3">
                    <div className="absolute left-2.5 top-3 bottom-10 w-0.5 bg-[#14B8A6]"></div>

                    {/* 3. The Loop: Now we map the actual radio button options */}
                    {deliveryOptions.map((deliveryOption) => {
                      const shippingFee =
                        deliveryOption.priceCents > 0
                          ? `$${formatMoney(deliveryOption.priceCents)} - Shipping`
                          : "Free Shipping";

                      return (
                        /* The label is now the outermost element being returned, so the key goes here! */
                        <label
                          key={deliveryOption.id}
                          className="relative z-10 flex gap-3 cursor-pointer group min-h-11 pb-4"
                        >
                          <input
                            type="radio"
                            name="deliveryOption"
                            value={deliveryOption.id}
                            checked={
                              deliveryOption.id === activeDeliveryOptionId
                            }
                            onChange={() =>
                              chooseDeliveryOption(deliveryOption.id)
                            }
                            className="relative mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-400 bg-white checked:border-[#14B8A6] checked:bg-[#14B8A6] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2 checked:after:w-2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:bg-white"
                          />

                          {/* The Text Content */}
                          <div className="">
                            <p className="font-medium text-[#1E293B]">
                              {dayjs(
                                deliveryOption.estimatedDeliveryTimeMs,
                              ).format("dddd, MMMM D")}
                            </p>
                            <p className="text-sm font-normal text-gray-500">
                              {shippingFee}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* right Payment Summary */}
            {paymentSummary && (
              <div className="max-w-90 rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
                <h3 className="text-base font-semibold tracking-tight text-slate-900">
                  Payment summary
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-500">
                  <div className="flex justify-between gap-4">
                    <span>Items ({paymentSummary.totalItems})</span>
                    <span className="font-medium text-slate-900">
                      {formatMoney(paymentSummary.productCostCents)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Shipping and handling</span>
                    <span className="font-medium text-slate-900">
                      {formatMoney(paymentSummary.shippingCostCents)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Total before tax</span>
                    <span className="font-medium text-slate-900">
                      {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Estimated tax</span>
                    <span className="font-medium text-slate-900">
                      {formatMoney(paymentSummary.taxCents)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-centfer justify-between border-t border-slate-200 pt-4">
                  <span className="font-semibold text-slate-900">
                    Order total
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </span>
                </div>

                <label className="mt-4 block text-sm font-medium text-slate-700">
                  Email address
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 outline-none focus:border-teal-500"
                  />
                </label>

                {paymentError && (
                  <p className="mt-2 text-sm text-red-600">{paymentError}</p>
                )}

                {pendingPaymentReference && !isPaying && (
                  <button
                    type="button"
                    onClick={() => savePaidOrder(pendingPaymentReference)}
                    className="mt-3 w-full rounded-lg border border-[#14B8A6] px-3 py-2 text-sm font-semibold text-[#0F766E]"
                  >
                    Retry saving paid order
                  </button>
                )}

                <button
                  onClick={handleOrder}
                  disabled={isPaying || !isPaystackReady}
                  className="mt-5 h-12 w-full rounded-xl bg-[#14B8A6] font-semibold text-white transition hover:bg-[#0F766E] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {!isPaystackReady
                    ? paystackLoadError
                      ? "Payment unavailable"
                      : "Loading payment..."
                    : isPaying
                      ? "Confirming payment..."
                      : "Place Order"}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
