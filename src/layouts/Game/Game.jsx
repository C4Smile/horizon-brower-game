import { Outlet } from "react-router-dom";
import Resources from "./components/Resources";

export const Game = () => {
  return (
    <>
      <header className="fixed top-0 left-0">
        <Resources />
      </header>
      <Outlet />
    </>
  );
};
