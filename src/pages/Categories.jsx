import { Header2 } from "../components/Header2";
import { formatMoney } from "../utils/money";
import { PageMeta } from "../utils/PageMeta";

const categoryNames = ["Clothing", "Home Appliances", "Sports"];

function getCategory(product) {
  const category = product.category?.toLowerCase() ?? "";
  const name = product.name?.toLowerCase() ?? "";

  if (
    category.includes("sport") ||
    /ball|sneaker|shoe|athletic|basketball|football/.test(name)
  ) {
    return "Sports";
  }

  if (
    category.includes("appliance") ||
    /toaster|kettle|blender|cooker|microwave/.test(name)
  ) {
    return "Home Appliances";
  }

  return "Clothing";
}

export const Categories = ({ products, isLoading, addToCart }) => {
  const availableProducts = Array.isArray(products) ? products : [];

  if (isLoading) {
    return (
      <>
        <Header2 heading="Categories" />
        <main className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#1E293B]" />
        </main>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Categories | Assorted Happy Shopping"
        description="Browse products by clothing, sports, and home appliance categories."
      />
      <Header2 heading="Categories" />
      <main className="categories-page min-h-screen bg-white px-4 pb-24 pt-24 text-[#1E293B]">
        <div className="mx-auto max-w-5xl space-y-8">
          {categoryNames.map((categoryName) => {
            const categoryProducts = availableProducts.filter(
              (product) => getCategory(product) === categoryName,
            );

            if (categoryProducts.length === 0) {
              return null;
            }

            return (
              <section key={categoryName}>
                <h2 className="mb-3 text-lg font-bold">{categoryName}</h2>
                <div className="category-grid grid auto-cols-38 grid-flow-col grid-rows-2 gap-3 overflow-x-auto overflow-y-hidden pb-2 md:auto-cols-44">
                  {categoryProducts.map((product) => (
                    <article
                      key={product.id}
                      className="flex h-44 flex-col overflow-hidden rounded-lg border border-[#DCE8EA] bg-[#F4F7F9] shadow-sm transition-shadow hover:shadow-md"
                    >
                      <img
                        src={product.image}
                        loading="lazy"
                        decoding="async"
                        alt={product.name}
                        className="h-24 w-full shrink-0 bg-white object-contain p-2"
                      />
                      <div className="flex min-h-0 flex-1 flex-col justify-between p-2">
                        <h3 className="line-clamp-1 text-sm">{product.name}</h3>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <p className="text-sm font-bold">
                            ${formatMoney(product.priceCents)}
                          </p>
                          <button
                            type="button"
                            aria-label={`Add ${product.name} to cart`}
                            onClick={() => addToCart(product)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white"
                          >
                            <span className="material-symbols-outlined text-sm">
                              shopping_cart
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          {availableProducts.length === 0 && (
            <p className="pt-16 text-center text-gray-500">
              No products are available yet.
            </p>
          )}
        </div>
      </main>
    </>
  );
};
