import { Header2 } from "../components/Header2";

export const ContactMe = () => {
    const navigateTo = "/";
    const icon = "cottage";
  return (
    <>
      <Header2 navigateTo={navigateTo} icon={icon}/>
      <main>
        <h1>My Details</h1>
      </main>
    </>
  );
};
