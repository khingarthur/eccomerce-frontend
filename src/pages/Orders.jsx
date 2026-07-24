import { Header } from "../components/Header";

export const Orders = () => {
  return (
    <>
      <title>KC | Orders</title>
        <main className="py-8 px-1 md:px-16">
          <h1 className="pl-3 md:pl-0 font-bold text-2x mb-6">Your Orders</h1>
          <div className="shadow shadow-gray-300 px-1 md:px-6 py-4">

            {/* first for mobile */}
              <div className=" md:hidden flex flex-wrap justify-between border-b border-gray-300 pb-4">
                  <div>
                      <h2 className="font-bold">Order Placed:</h2>
                      <h2 className="font-bold">Total:</h2>
                      <h2 className="font-bold">Order ID:</h2>
                  </div>
                  <div>
                      <p>August 12</p>
                      <p>$35.06</p>
                      <p>223234-424-v3fw-2ref23v</p>
                  </div>
              </div>

              {/* first for large screen */}
              <div className="hiddenmd:flex flex-wrap justify-between border-b border-gray-300 pb-4">
              <div>
                <h2 className="font-bold">Order Placed:</h2>
                <p>August 12</p>
              </div>
              <div>
                <h2 className="font-bold">Total</h2>
                <p>$35.06</p>
              </div>
              <div>
                <h2 className="font-bold">Order ID</h2>
                <p>223234-424-v3fw-2ref23v</p>
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
              <div className="pt-4 md:flex flex-col gap-4 hidden">

                  {/* 1st */}
                  <div className="flex justify-between gap-4">
                      <img src="watch.png" alt="" className="w-30" />
                      <div className="flex flex-col gap-1">
                          <p className="font-bold"> Executive gold watch</p>
                          <p className="text-gray-600">
                          Arriving on: <span>August 15</span>
                          </p>
                          <p className="text-gray-600">
                          Quantity: <span>1</span>
                          </p>
                      </div>
                      <div className=" flex flex-col gap-4 justify-between">
                          <button className="shadow shadow-gray-300 py-2 px-6 hover:bg-gray-100">
                              Track Package
                          </button>
                          <button className="bg-green-500 rounded-sm px-13.5 py-2 hover:text-white hover:bg-green-700">
                              Add to Cart
                          </button>
                          
                      </div>
                      
                  </div>

            </div>
            
          </div>
        </main>
    </>
  );
};
