import { NavLink } from "react-router";


export const Tracking = () => {
  return (
    <div>
      <head className="flex justify-between items-center">
        <NavLink to="/orders" className="">
          <span className=" material-symbols-outlined ">arrow</span>
        </NavLink>
        <h1>Track Order</h1>
        <span className=" material-symbols-outlined ">arrow</span>
      </head>

      <main>
        <div>
          <h1>Order:</h1> <span>#{}</span>
          <p>Placed on</p> <span>#{}</span>
        </div>

        <div>
          <div>
            <p>Estimated delivery</p>
            <p>Thursday, August, 29</p>
            <p>progress bar</p>
          </div>

          <div className="flex flex-col">
            <div>
                <button>Order Placed</button>
                <p></p>
            </div>

            <div>
                <button>Order Confirmed</button>
                <p></p>    
            </div>

            <div>
                <button>Shipped</button>
                <p></p>
            </div>

            <div>
                <button>Delivered</button>
                <p></p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
