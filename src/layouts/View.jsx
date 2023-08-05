import { Outlet } from "react-router-dom";

// components
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ToTop from "../components/ToTop/ToTop";

function View() {
  return (
    <main
      className={`w-full min-h-screen dark:bg-dark-background2 bg-light-background2 transition`}
    >
      <ToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default View;
