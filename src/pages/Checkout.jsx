export const Checkout = ({ cart }) => {
  let totalQuantity = 0;
  cart.map((item) => {
    totalQuantity += item.quantity;
  });

  return (
    <div>
      <title>KC|Checkout</title>
      {/* <nav className=" flex justify-between items-center h-20 bg-gray-50 py-2 px-4">
        <a
          href="/"
          className="text-xl text-green-500 font-bold hover:text-amber-400"
        >
          KOBBYCommerce
        </a>

        <div className="flex-1 flex justify-center">
          <h3 className="font-bold text-xl">
            Checkout (<span className="text-green-600 font-bold">3 Items</span>)
          </h3>
        </div>

        <div className="flex gap-4 text-green-500 ">
          <div className="flex hover:text-amber-400">
            <a href="">
              <span class="material-symbols-outlined">shopping_cart</span>
            </a>
            <a href="">Cart</a>
          </div>
        </div>
      </nav> */}
      
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
          {cart.map(() => {
            return (
              <div className="flex flex-col gap-2">
                {/* 1st */}
                <div className="shadow-md px-4 py-4">
                  <h3 className="py-2 text-xl font-bold text-green-600">
                    Delivery Date Tuesday
                  </h3>

                  <div className="flex gap-8 justify-between">
                    <div className="flex gap-4">
                      <div>
                        <img className="w-24" src="belt.png" alt="" />
                      </div>
                      <div>
                        <p className="font-bold">Black lether belt </p>
                        <p className="font-bold">$410.90</p>
                        <p className="text-gray-600 font-bold">
                          Quantity: <span>2</span>
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <h3 className="font-bold">Choose a delivery option</h3>

                      <div className="">
                        <label className="flex gap-1">
                          <input
                            type="radio"
                            id="first-date"
                            name="delivery-option"
                          />
                          <div className="">
                            <p className="h-5 font-bold">Tuesday, June 21</p>
                            <p className=" text-gray-600">Free shiping</p>
                          </div>
                        </label>
                        <label className="flex gap-1">
                          <input
                            type="radio"
                            id="second-date"
                            name="delivery-option"
                          />
                          <div>
                            <p className="h-5 font-bold">Wednessday, June 15</p>
                            <p className=" text-gray-600">$4.99-shipping</p>
                          </div>
                        </label>
                        <label className="flex gap-1">
                          <input
                            type="radio"
                            id="third-date"
                            name="delivery-option"
                          />
                          <div>
                            <p className="h-5 font-bold">Monday, June 13</p>
                            <p className=" text-gray-600">$9.99-shipping</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2nd */}
                <div className="shadow-md px-4 py-4">
                  <h3 className="py-2 text-xl font-bold text-green-600">
                    Delivery Date Tuesday
                  </h3>

                  <div className="flex gap-8 justify-between">
                    <div className="flex gap-4">
                      <div>
                        <img className="w-24" src="shirt.png" alt="" />
                      </div>
                      <div>
                        <p className="font-bold">Black lether belt </p>
                        <p className="font-bold">$410.90</p>
                        <p className="text-gray-600 font-bold">
                          Quantity: <span>2</span>
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <h3 className="font-bold">Choose a delivery option</h3>

                      <div className="">
                        <label className="flex gap-1">
                          <input
                            type="radio"
                            id="first-date"
                            name="delivery-option"
                          />
                          <div className="">
                            <p className="h-5 font-bold">Tuesday, June 21</p>
                            <p className=" text-gray-600">Free shiping</p>
                          </div>
                        </label>
                        <label className="flex gap-1">
                          <input
                            type="radio"
                            id="second-date"
                            name="delivery-option"
                          />
                          <div>
                            <p className="h-5 font-bold">Wednessday, June 15</p>
                            <p className=" text-gray-600">$4.99-shipping</p>
                          </div>
                        </label>
                        <label className="flex gap-1">
                          <input
                            type="radio"
                            id="third-date"
                            name="delivery-option"
                          />
                          <div>
                            <p className="h-5 font-bold">Monday, June 13</p>
                            <p className=" text-gray-600">$9.99-shipping</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* right Payment Summary */}
          <div className="shadow-md px-2 max-w-90">
            <h3 className="font-bold text-xl">Payment Sumary</h3>
            <p className="text-gray-600 font-bold">Items</p>
            <div className="flex justify-between font-bold text-gray-600">
              <div>
                <p>Shipping and handling</p>
                <p>Total before tax</p>
                Estimated tax (10%)
              </div>
              <div>
                <p>$42.54</p>
                <p>$42.54</p>
                <p className="border-b"></p>
                <p>$2.54</p>
                <p>$49.00</p>
              </div>
            </div>
            <p className="border-b"></p>
            <div className="flex flex-col">
              <div className="flex justify-between text-xl font-bold text-green-600">
                <p>Oder total: </p>
                <p>$52.63</p>
              </div>
              <button className=" bg-green-600 m-4 py-2 rounded-sm hover:bg-green-800 hover:text-white ">
                Place your order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
