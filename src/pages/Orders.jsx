import { useEffect, useState, Fragment } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../utils/money";

export const Orders = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/orders?expand=products",
      );
      setOrders(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <title>KC | Orders</title>

      <main className="py-8 px-1 md:px-16">
        <h1 className="pl-3 md:pl-0 font-bold text-2x mb-6">Your Orders</h1>

        {orders.map((order) => {
          return (
            <Fragment key={order.id}>
              <div className="shadow shadow-gray-300 px-1 md:px-6 py-4 mb-6">
                {/* first for mobile */}
                <div className=" md:hidden flex flex-wrap justify-between border-b border-gray-300 pb-4">
                  <div>
                    <h2 className="font-bold">Order Placed:</h2>
                    <h2 className="font-bold">Total:</h2>
                    <h2 className="font-bold">Order ID:</h2>
                  </div>
                  <div>
                    <p>{dayjs(order.orderTimeMs).format("dddd, MMMM D")}</p>
                    <p>{formatMoney(order.totalCostCents)}</p>
                    <p>{order.id}</p>
                  </div>
                </div>

                {/* first for large screen */}
                <div className="hidden md:flex flex-wrap justify-between border-b border-gray-300 pb-4">
                  <div>
                    <h2 className="font-bold">Order Placed:</h2>
                    <p>{dayjs(order.orderTimeMs).format("dddd, MMMM D")}</p>
                  </div>
                  <div>
                    <h2 className="font-bold">Total</h2>
                    <p>{formatMoney(order.totalCostCents)}</p>
                  </div>
                  <div>
                    <h2 className="font-bold">Order ID</h2>
                    <p>{order.id}</p>
                  </div>
                </div>

                {/* second for mobile*/}
                <div className="md:hidden  pt-4 flex flex-col gap-4">
                  {/* 1st */}
                  <div className="flex gap-4">
                    <img src="watch.png" alt="" className="w-28" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold"> Executive gold watch</p>
                      <p className="text-gray-600">
                        Arriving on: <span>August 15</span>
                      </p>
                      <p className="text-gray-600">
                        Quantity: <span>1</span>
                      </p>
                      <button className="mt-auto w-full shadow shadow-gray-300 py-2 px-6 hover:bg-gray-100">
                        Track Package
                      </button>
                    </div>
                  </div>

                  <div className="">
                    <button className="bg-green-500 rounded-sm w-full py-2 hover:text-white hover:bg-green-700">
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* second for large screen*/}
                <div className="pt-2 md:flex flex-col gap-8 hidden">
                  {/* 1st */}

                  {order.products.map((product) => {
                    return (
                      <div
                        key={product.productId}
                        className="flex justify-between"
                      >
                        <img
                          src={product.product.image}
                          alt=""
                          className="w-30"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-bold">{product.product.name}</p>
                          <p className="text-gray-600">
                            Arriving on:{" "}
                            <span>
                              {dayjs(product.estimatedDeliveryTimeMs).format(
                                "MMMM d",
                              )}
                            </span>
                          </p>
                          <p className="text-gray-600">
                            Quantity: <span>{product.quantity}</span>
                          </p>
                        </div>
                        <div className=" flex justify-between gap-2 h-10 mt-4">
                          <button className="shadow shadow-gray-300 py-2 px-6 hover:bg-gray-100">
                            Track Package
                          </button>
                          <button className="bg-green-500 rounded-sm px-13.5 py-2 hover:text-white hover:bg-green-700">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Fragment>
          );
        })}
      </main>
    </>
  );
};
