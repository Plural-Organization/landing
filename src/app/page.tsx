import Faq from "../components/Faq";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Install from "../components/Install";
import ContextProblem from "../components/ContextProblem";
import Nav from "../components/Nav";
import ProductShowcase from "../components/ProductShowcase";
import Roles from "../components/Roles";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ContextProblem />
        <ProductShowcase />
        <Features />
        <Roles />
        <Faq />
        <Install />
      </main>
      <Footer />
    </>
  );
}
