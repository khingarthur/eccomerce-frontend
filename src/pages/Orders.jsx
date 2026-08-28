import { useEffect, useRef, useState, Fragment } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../utils/money";
import { useNavigate } from "react-router";
import { Header2 } from "../components/Header2";

export const Orders = ({ deviceId, addToCart }) => {
  const heading = "Your Orders";

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // for added to cart message
  const [addedProductKey, setAddedProductKey] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/orders?expand=products&deviceId=${deviceId}`,
      );

      if (response.data.length === 0) {
        setOrders([]);
        setIsLoading(false);
        return;
      }
      setOrders(response.data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [deviceId]);

  // Handle add to cart with show added message
  const timerRef = useRef(null);

  const handleShowIsAdded = (product, productKey, quantity = 1) => {
    addToCart(product, quantity);
    setAddedProductKey(productKey);

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Hide the message after 2 seconds
    timerRef.current = setTimeout(() => {
      setAddedProductKey(null);
    }, 2000);
  };

  const handleTracking = () => {};

  if (isLoading === true) {
    return (
      <>
        <title>KC | Orders</title>
        <Header2 heading={heading} />
        <main className="bg-white text-[#1E293B] py-12 px-4 flex flex-col items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1E293B] rounded-full animate-spin"></div>
        </main>
      </>
    );
  }

  if (orders && orders.length === 0) {
    return (
      <>
        <title>KC | Orders</title>
        <Header2 heading={heading} />
        <main className="bg-white text-[#1E293B] py-12 px-4 flex flex-col items-center justify-center min-h-screen">
          <h1 className="pl-3 md:pl-0 mb-6 text-2xl font-bold tracking-tight">
            You Have No Orders
          </h1>
          <button
            className="rounded-md bg-[#15183a] px-10 py-3 font-semibold text-white hover:bg-[#1E293B]"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            View Cart
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <title>KC | Orders</title>
      <Header2 heading={heading} />
      <main className="font-manrope w-full bg-white text-[#1E293B] pt-20 pb-20 px-2 md:px-16 min-h-screen">
        {orders.map((order) => {
          return (
            <Fragment key={order.id}>
              <div className="bg-[#F4F7F9] w-full  shadow shadow-[#0A161E]/10 rounded-xl px-2 md:px-6 py-5 mb-6 border border-[#DCE8EA]">
                {/* for small screen */}
                <div className="md:hidden w-full">
                  <div className=" flex justify-between text-white px-2 py-4 rounded-xl gap-2 mb-4 bg-[#1E293B]">
                    {/* Row 1: Order Placed */}
                    <div className="flex flex-col gap-1 items-center">
                      <h2 className="text-sm flex items-center gap-1 whitespace-nowrap">
                        <span className="material-symbols-outlined !text-sm">
                          calendar_today
                        </span>
                        Placed On
                      </h2>
                      <p className="font-bold text-right">
                        {dayjs(order.orderTimeMs).format("MMMM D")}
                      </p>
                    </div>

                    {/* Row 2: Total */}
                    <div className="flex flex-col gap-1 items-center">
                      <h2 className="text-sm whitespace-nowrap">Total</h2>
                      <p className="font-bold text-right">
                        {formatMoney(order.totalCostCents)}
                      </p>
                    </div>

                    {/* Row 3: Order ID */}
                    <div className=" flex flex-col gap-1 items-center">
                      <h2 className="text-sm whitespace-nowrap">Order ID</h2>
                      <p className="font-bold text-right ">
                        {order.id.split("-")[0].toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* second for mobile: All products in an order*/}
                  <div className="pt-4 flex flex-col gap-4">
                    {/* 1st */}
                    {order.products.map((product) => {
                      const productKey = `${order.id}-${product.productId}`;

                      return (
                        <div key={product.productId} className="flex gap-3 ">
                          <img
                            src={product.product.image}
                            alt=""
                            className="w-24 sm:w-28 rounded-md object-cover shrink-0"
                          />

                          {/* product details and buttons */}
                          <div className="flex flex-1 gap-2 flex-col ">
                            {/* product details */}
                            <div>
                              <div className="flex flex-col gap-1">
                                <p className="line-clamp-1 font-semibold">
                                  {product.product.name}
                                </p>
                                <p className="text-sm text-[#64748B]">
                                  Arriving on:{" "}
                                  <span>
                                    {dayjs(
                                      product.estimatedDeliveryTimeMs,
                                    ).format("MMMM d")}
                                  </span>
                                </p>
                                <p className="text-sm text-[#64748B]">
                                  Quantity: <span>{product.quantity}</span>
                                </p>
                              </div>
                            </div>

                            {/* buttons */}
                            <div className="flex gap-2 mt-auto">
                              <button className="px-2 py-1 !text-sm !font-bold text-[#15183a] border  border-[#14B8A6] rounded-md hover:bg-[#0F766E]">
                                Track Package
                              </button>

                              <div>
                                {addedProductKey === productKey && (
                                  <div className="absolute-top-8  text-[#15183a] !text-xs flex justify-center gap-1 transition-opacity">
                                    ✓ Added To Cart
                                  </div>
                                )}
                                <button
                                  onClick={() =>
                                    handleShowIsAdded(product, productKey)
                                  }
                                  className="rounded-md px-2 py-1 !font-bold border border-[#15183a] !text-sm text-[#15183a]  hover:bg-[#1E293B]"
                                >
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* for large screen */}
                <div className="hidden md:block">
                  {/* first for large screen */}
                  <div className="hidden md:flex flex-wrap justify-between border-b border-[#CBD5E1] pb-4">
                    <div>
                      <h2 className="font-semibold">Order Placed:</h2>
                      <p>{dayjs(order.orderTimeMs).format("dddd, MMMM D")}</p>
                    </div>
                    <div>
                      <h2 className="font-semibold">Total</h2>
                      <p>{formatMoney(order.totalCostCents)}</p>
                    </div>
                    <div>
                      <h2 className="font-semibold">Order ID</h2>
                      <p>{order.id}</p>
                    </div>
                  </div>

                  {/* second for large screen*/}
                  <div className="pt-2 md:flex flex-col gap-8 hidden">
                    {/* 1st */}

                    {order.products.map((product) => {
                      const productKey = `${order.id}-${product.productId}`;

                      return (
                        <div key={product.productId} className="flex gap-8">
                          <img
                            src={product.product.image}
                            alt=""
                            className="w-30 rounded-md"
                          />
                          {/* Product details */}
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold">
                              {product.product.name}
                            </p>
                            <p className="text-[#64748B]">
                              Arriving on:{" "}
                              <span>
                                {dayjs(product.estimatedDeliveryTimeMs).format(
                                  "MMMM d",
                                )}
                              </span>
                            </p>
                            <p className="text-[#64748B]">
                              Quantity: <span>{product.quantity}</span>
                            </p>
                          </div>

                          <div className="relative flex justify-between gap-2 h-10 mt-4">
                            <button
                              onClick={handleTracking}
                              className="bg-[#14B8A6] text-white shadow shadow-[#0A161E]/10 py-2 px-6 rounded-md hover:bg-[#0F766E]"
                            >
                              Track Package
                            </button>

                            {addedProductKey === productKey && (
                              <div className="absolute -top-8 right-0 text-[#14B8A6] font-bold flex items-center gap-1">
                                ✓ Added To Cart
                              </div>
                            )}

                            <button
                              onClick={() =>
                                handleShowIsAdded(product, productKey)
                              }
                              className="bg-[#15183a] text-white rounded-md px-13.5 py-2 font-semibold hover:bg-[#1E293B]"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </main>
    </>
  );
};
