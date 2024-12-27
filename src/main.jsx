import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

// providers
import { HorizonApiClientProvider } from "./providers/HorizonApiProvider";
import { AccountProvider } from "./providers/AccountProvider";
import { NotificationProvider } from "./providers/NotificationProvider.jsx";

// styles
import "./index.css";

// i18
import "./i18.js";

// app
import App from "./App.jsx";

// fonts
import "@fontsource/poppins";
import { GameProvider } from "./providers/GameApiProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <HorizonApiClientProvider>
      <AccountProvider>
        <GameProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </GameProvider>
      </AccountProvider>
    </HorizonApiClientProvider>
  </Router>
);
