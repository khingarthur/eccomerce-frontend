import { NavLink } from "react-router";

export const Header = ({ cart }) => {

  let totalQuantity = 0;
  cart.map((item) => {
    totalQuantity += item.quantity;
  });

  return (
    <nav className=" flex justify-between items-center flex-wrap gap-y-4 bg-green-600 py-2 px-4 md:px-6">
      <NavLink
        to="/"
        className="text-amber-50 hover:text-amber-400 font-bold md:text-xl"
      >
        KOBBYCommerce
      </NavLink>

      <div className="w-full flex md:flex-1 order-last justify-center md:order-0">
        <form className="flex h-12 w-full max-w-2xl px-4">
          <input
            name="search"
            className="bg-amber-50 rounded-l-md px-4 w-full focus:outline-none font-bold"
            placeholder="Search"
          />

          <button
            type="submit"
            className="bg-amber-200 px-2 rounded-r-md hover:bg-amber-300"
          >
            <span className="material-symbols-outlined align-middle">
              arrow_right_alt
            </span>
          </button>
        </form>
      </div>

      <div className="flex gap-4 text-amber-50 md:text-xl font-bold">
        <NavLink className="hover:text-amber-400" to="/orders">
          Orders
        </NavLink>
        <div className="flex hover:text-amber-400">
          <NavLink to="/checkout">
            <sup className="bg-amber-600 p-0.5 rounded-lg">{totalQuantity}</sup>
            <span className="material-symbols-outlined">shopping_cart</span>
          </NavLink>
          <NavLink to="/checkout">Cart</NavLink>
        </div>
      </div>
    </nav>
  );
};
