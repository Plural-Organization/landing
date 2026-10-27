import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Install from "../components/Install";
import Nav from "../components/Nav";
import SessionLog from "../components/SessionLog";
import TuiExample from "../components/TuiExample";
import Loader from "../islands/Loader";

export default function Page() {
  return (
    <>
      <Loader />
      <div className="page" id="page">
        <Nav />
        <Hero />
        <TuiExample />
        <SessionLog />
        <Install />
        <Footer />
      </div>
    </>
  );
}
