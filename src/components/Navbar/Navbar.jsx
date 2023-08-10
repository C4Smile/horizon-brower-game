import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useMode } from "../../contexts/ModeProvider";
import { useUser } from "../../contexts/UserProvider";
import { useLanguage } from "../../contexts/LanguageProvider";

// utils
import { userLogged } from "../../utils/auth";
import { utilsToggleTheme } from "../../utils/utils.js";

function Navbar() {
  const location = useLocation();

  const { userState } = useUser();
  const { languageState } = useLanguage();
  const { modeState, toggleModeState } = useMode();

  const printLinks = useCallback(() => {
    return languageState.texts.nav.links
      .filter((link) => {
        switch (link.logged) {
          case false:
            if (userState.user) return false;
            return true;
          case true:
            if (userState.user) return true;
            return false;
          default:
            return true;
        }
      })
      .map((link) => (
        <li
          key={link.to}
          className={`transition ${
            location.pathname === link.to ? "text-white" : ""
          } hover:text-white hover:bg-pdark-hover h-[65px] px-5 flex items-center`}
        >
          <Link className="flex items-center" to={link.to}>
            {link.label}
          </Link>
        </li>
      ));
  }, [languageState, location, userState]);

  const toggleTheme = () => {
    utilsToggleTheme();
    toggleModeState();
  };

  return (
    <header className="bg-primary w-full">
      <div className="navbar">
        <Link to="/" className="flex flex-row">
          <h2 className="text-light-background">Horizon</h2>
        </Link>
        <div className="flex items-center gap-5">
          <nav>
            <ul className="flex items-center">
              {printLinks()}
              <li>
                <Link to={userLogged() ? "/sign-out" : "/auth"} className="cta">
                  {userLogged()
                    ? languageState.texts.buttons.logout
                    : languageState.texts.buttons.login}
                </Link>
              </li>
            </ul>
          </nav>
          <button
            onClick={toggleTheme}
            className="icon-button !text-dark-background2"
          >
            <FontAwesomeIcon icon={modeState.mode ? faSun : faMoon} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
