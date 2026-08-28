import { Header2 } from "../components/Header2";

export const ContactMe = () => {
  const navigateTo = "/";
  const icon = "cottage";

  return (
    <>
      <Header2 navigateTo={navigateTo} icon={icon} />
      <main className="min-h-screen bg-white px-5 pb-28 pt-28 text-[#1E293B]">
        <section className="mx-auto max-w-xl">
          <div className="rounded-xl bg-[#15183a] px-6 py-8 text-white shadow-md">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#14B8A6]">
              Get in touch
            </p>
            <h1 className="mt-2 text-3xl font-bold">Frederick Arthur</h1>
            <p className="mt-4 leading-7 text-[#E2E8F0]">
              I am open to business opportunities and collaborations with
              people who want to build useful, thoughtful, and reliable
              software projects.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href="mailto:arthurfrederick03@gmail.com"
              className="flex items-center gap-4 rounded-lg border border-[#DCE8EA] bg-[#F4F7F9] px-4 py-4 shadow-sm transition hover:border-[#14B8A6]"
            >
              <span className="material-symbols-outlined text-[#14B8A6]">
                mail
              </span>
              <span>
                <span className="block text-sm text-[#64748B]">Email</span>
                <span className="font-semibold">
                  arthurfrederick03@gmail.com
                </span>
              </span>
            </a>

            <a
              href="https://github.com/khingarthur"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-lg border border-[#DCE8EA] bg-[#F4F7F9] px-4 py-4 shadow-sm transition hover:border-[#14B8A6]"
            >
              <span className="material-symbols-outlined text-[#14B8A6]">
                code
              </span>
              <span>
                <span className="block text-sm text-[#64748B]">GitHub</span>
                <span className="font-semibold">github.com/khingarthur</span>
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/arthur03"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-lg border border-[#DCE8EA] bg-[#F4F7F9] px-4 py-4 shadow-sm transition hover:border-[#14B8A6]"
            >
              <span className="material-symbols-outlined text-[#14B8A6]">
                work
              </span>
              <span>
                <span className="block text-sm text-[#64748B]">LinkedIn</span>
                <span className="font-semibold">
                  linkedin.com/in/arthur03
                </span>
              </span>
            </a>
          </div>

          <p className="mt-6 text-center text-sm leading-6 text-[#64748B]">
            For business inquiries, freelance work, or project collaboration,
            send me an email or connect with me on LinkedIn or GitHub.
          </p>
        </section>
      </main>
    </>
  );
};
