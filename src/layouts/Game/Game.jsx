import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// providers
import { useAccount } from "../../providers/AccountProvider.jsx";

// components
import ActionPanel from "./components/Actions/ActionPanel.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// sitemap
import { findPath, pageId } from "../../pages/sitemap.jsx";

// providers
import { ActionPanelProvider } from "../../providers/ActionPanelProvider.jsx";

const Game = () => {
  const navigate = useNavigate();

  const { account } = useAccount();

  /* useEffect(() => {
    if (!account.user) navigate(findPath(pageId.signOut));
  }, [account, navigate]); */

  return (
    <ActionPanelProvider>
      <Header />
      <ActionPanel />
      <main className="screen">
        <Outlet />
      </main>
      <Footer />
    </ActionPanelProvider>
  );
};

export default Game;
