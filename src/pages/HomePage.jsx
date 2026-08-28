import { Header } from "../components/Header";
import { Product } from "../components/Product";
import { PageMeta } from "../utils/PageMeta";

export const HomePage = ({ products, isLoading, addToCart }) => {
  if (isLoading === true) {
    return (
      <>
        <Header />
        <main className="bg-white text-[#1E293B] py-12 px-4 flex flex-col items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1E293B] rounded-full animate-spin"></div>
        </main>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Assorted Happy Shopping | Home"
        description="Shop clothing, shoes, sports products, and home appliances."
      />

      <Header />
      <main className="font-manrope mt-28 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white text-[#1E293B] w-full min-h-screen mb-25 px-2 md:px-10">
        {/* card */}
        {products.map((product) => {
          return (
            <Product key={product.id} product={product} addToCart={addToCart} />
          );
        })}
      </main>
    </>
  );
};
