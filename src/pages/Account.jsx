import { Header2 } from "../components/Header2";
import { PageMeta } from "../utils/PageMeta";

export const Account = () => {
  return (
    <>
      <PageMeta
        title="Account | Assorted Happy Shopping"
        description="Account features for Assorted Happy Shopping are coming soon."
      />
      <Header2 heading="Account" />
      <main className="flex min-h-screen items-center justify-center bg-white px-5 pb-28 text-center text-[#1E293B]">
        <section className="w-full max-w-md rounded-xl border border-[#DCE8EA] bg-[#F4F7F9] px-6 py-8 shadow-sm">
          <span className="material-symbols-outlined text-5xl text-[#14B8A6]">
            person_2
          </span>
          <h1 className="mt-4 text-2xl font-bold">Account coming soon</h1>
          <p className="mt-3 leading-6 text-[#64748B]">
            Account features are being implemented. You will soon be able to
            manage your profile, saved details, and account settings here.
          </p>
        </section>
      </main>
    </>
  );
};
