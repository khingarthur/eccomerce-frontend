import { useNavigate } from "react-router";
import { Header2 } from "../components/Header2";
import { PageMeta } from "../utils/PageMeta";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="Page Not Found | Assorted Happy Shopping"
        description="The requested page could not be found."
      />
      <Header2 heading="Page Not Found" navigateTo="/" icon="home" />
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-5 pb-28 text-center text-[#1E293B]">
        <span className="material-symbols-outlined text-6xl text-[#14B8A6]">
          search_off
        </span>
        <p className="mt-4 text-6xl font-bold text-[#15183a]">404</p>
        <h1 className="mt-3 text-2xl font-bold">This page does not exist</h1>
        <p className="mt-2 max-w-sm text-[#64748B]">
          The page you are looking for may have moved or is no longer available.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 rounded-lg bg-[#14B8A6] px-5 py-3 font-semibold text-white hover:bg-[#0F766E]"
        >
          Back to home
        </button>
      </main>
    </>
  );
};
