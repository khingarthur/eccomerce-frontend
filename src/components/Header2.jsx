import { useNavigate } from "react-router";
import { NavLink } from "react-router";

export const Header2 = ({
  heading,
  icon = "support_agent",
  navigateTo = "/contactme",
}) => {
  const navigate = useNavigate();

  return (
    <header className="font-manrope font-bold text-[#1E293B] fixed top-0 left-0 w-full bg-white  z-50 ">
      <div className="flex justify-between items-center p-4 shadow-md rounded m-2 mx-2">
        <span
          className="material-symbols-outlined shadow-sm rounded-lg py-1 px-3 shadow-[#0F766E]"
          onClick={() => {
            navigate(-1);
          }}
        >
          arrow_back
        </span>
        <div className="flex min-w-0 items-center gap-2">
          <img
            src="/logo.png"
            alt="Assorted Happy Shopping"
            className="h-9 w-12 shrink-0 object-contain"
          />
          <h1 className="truncate text-xl font-bold">{heading}</h1>
        </div>
        <NavLink to={navigateTo}>
          <span className="material-symbols-outlined shadow-[#0F766E] shadow-sm rounded-lg py-1 px-3">
            {icon}
          </span>
        </NavLink>
      </div>
    </header>
  );
};
