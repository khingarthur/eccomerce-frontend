import { NavLink } from "react-router";

export const Navigation = ({ cart }) => {
  let totalQuantity = 0;
  cart.map((item) => {
    totalQuantity += item.quantity;
  });

  return (
    <nav className="desktop-navigation font-manrope fixed z-50 mt-8 bottom-0 py-2 left-0 w-full flex justify-between bg-white px-4 border-b rounded-b-2xl border-[#1E293B]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center border-b-2 pb-1 text-[#1E293B] hover:text-[#0F766E] font-semibold md:text-xl tracking-wide ${
            isActive ? "border-[#0ECCC0]" : "border-transparent"
          }`
        }
      >
        <span className=" material-symbols-outlined text-2xl!">cottage</span>
        <p className="text-xs">Home</p>
      </NavLink>

      <NavLink
        to="/categories"
        className={({ isActive }) =>
          `flex flex-col items-center border-b-2 pb-1 hover:text-[#0F766E] font-semibold text-[#1E293B] ${
            isActive ? "border-[#0ECCC0]" : "border-transparent"
          }`
        }
      >
        <span className="material-symbols-outlined text-2xl!">list_alt</span>
        <p className="text-xs">Categories</p>
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex flex-col items-center border-b-2 pb-1 hover:text-[#0F766E] font-semibold text-[#1E293B] ${
            isActive ? "border-[#0ECCC0]" : "border-transparent"
          }`
        }
      >
        <span className="material-symbols-outlined text-2xl!">
          local_shipping
        </span>
        <p className="text-xs">Orders</p>
      </NavLink>

      <NavLink
        to="/checkout"
        className={({ isActive }) =>
          `relative flex flex-col items-center border-b-2 pb-1 hover:text-[#0F766E] font-semibold text-[#1E293B] ${
            isActive ? "border-[#0ECCC0]" : "border-transparent"
          }`
        }
      >
        <span className="material-symbols-outlined text-2xl!">
          <div className="absolute -top-2 -right-2 bg-[#14B8A6] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            {totalQuantity}
          </div>
          shopping_cart
        </span>
        <p className="text-xs">Cart</p>
      </NavLink>

      <NavLink
        to="/account"
        className={({ isActive }) =>
          `flex flex-col items-center border-b-2 pb-1 hover:text-[#0F766E] font-semibold text-[#1E293B] ${
            isActive ? "border-[#0ECCC0]" : "border-transparent"
          }`
        }
      >
        <span className="material-symbols-outlined text-2xl!">person_2</span>
        <p className="text-xs">Account</p>
      </NavLink>
    </nav>
  );
};
