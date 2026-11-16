import Faq from "../components/Faq";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Install from "../components/Install";
import Story from "../components/Story";
import Nav from "../components/Nav";
import Roles from "../components/Roles";
import Terminal from "../components/Terminal";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Features />
        <Terminal />
        <Roles />
        <Faq />
        <Install />
      </main>
      <Footer />
    </>
  );
}
