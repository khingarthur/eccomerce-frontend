export const Header = ({ selectedCategory, onCategorySelect }) => {
  const categories = ["All", "Clothing", "Shoes", "Sport", "cook"];

  return (
    <header className="font-manrope z-50 flex flex-col gap-2 fixed top-0 px-2 rounded w-full bg-white py-4  ">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2">
        <img
          src="/logo.png"
          alt="Assorted Happy Shopping"
          className="h-16 w-32 shrink-0 object-contain"
        />
        <form className="flex h-8 text-sm w-full">
          <input
            name="search"
            className="w-full rounded-xl rounded-r-none bg-white shadow px-4 text-sm font-medium text-[#1E293B] border border-[#14B8A6] focus:outline-none"
            placeholder="Search"
          />

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
        return(
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
        )
      })}
      </div>

    </header>
  );
};
