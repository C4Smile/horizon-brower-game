import { Outlet } from "react-router-dom";

// components
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// providers
import { ActionPanelProvider } from "../../providers/ActionPanelProvider.jsx";

const Game = () => {
  return (
    <ActionPanelProvider>
      <Header />
      <main className="screen">
        <Outlet />
      </main>
      <Footer />
    </ActionPanelProvider>
  );
};

export default Game;
