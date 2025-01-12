import { useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// providers
import { useAccount } from "../../providers/AccountProvider.jsx";

// sections
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// components
import Panel from "../../components/PanelCard/Panel.jsx";

// sitemap
import { findPath, pageId } from "../../pages/sitemap.jsx";

// providers
import { ActionPanelProvider } from "../../providers/ActionPanelProvider.jsx";
import { SocketProvider } from "../../providers/SocketProvider.jsx";

const Game = () => {
  const navigate = useNavigate();

  const { account } = useAccount();

  /* useEffect(() => {
    if (!account.user) navigate(findPath(pageId.signOut));
  }, [account, navigate]); */

  return (
    <SocketProvider>
      <ActionPanelProvider>
        <Header />

        <main className="screen">
          <Outlet />
        </main>
        <Footer />
      </ActionPanelProvider>
    </SocketProvider>
  );
};

export default Game;
