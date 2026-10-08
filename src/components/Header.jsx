export const Header = ({ selectedCategory, onCategorySelect }) => {
  const categories = ["All", "Clothing", "Shoes", "Sport", "cook"];

  return (
    <header className="shop-header font-manrope z-50 flex flex-col gap-2 fixed top-0 px-2 rounded w-full bg-white py-4  ">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2">
        <form className="flex h-8 text-sm w-full">
          <div className="flex min-w-0 flex-1 items-center rounded-l-xl border border-r-0 border-[#14B8A6] bg-white shadow">
            <img
              src="/logo.png"
              alt="Assorted Happy Shopping"
              className="ml-2 h-6 w-8 shrink-0 object-contain"
            />
            <input
              name="search"
              className="min-w-0 w-full bg-transparent px-2 text-sm font-medium text-[#1E293B] outline-none"
              placeholder="Search products..."
            />
          </div>

          <button
            type="submit"
            className="rounded-r-xl bg-[#14B8A6] px-2 text-white hover:bg-[#0F766E]"
          >
            <span className="material-symbols-outlined align-middle ">
              arrow_right_alt
            </span>
          </button>
        </form>
      </div>

      <div className="flex justify-around pt-2 items-center w-full max-w-md  mx-auto text-sm">
        {categories.map((category) => {
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategorySelect(category)}
              aria-pressed={selectedCategory === category}
              className={`px-2 text-sm font-semibold shadow rounded-xl border border-[#14B8A6] ${
                selectedCategory === category
                  ? "bg-[#14B8A6] text-white"
                  : "text-[#1E293B] hover:text-[#14B8A6]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </header>
  );
};
