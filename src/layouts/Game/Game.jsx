import { Outlet } from "react-router-dom"

// components
import Resources from "./components/Resources/Resources.jsx";
import Actions from "./components/Actions/Actions.jsx";

const Game = () => {
  return (
    <>
      <header className="flex p-3 w-full justify-between">
        <div></div>
        <Resources />
      </header>
      <Outlet />
      <footer className="flex p-3 w-full justify-between">
        <Actions />
      </footer>
    </>
  );
};

export default Game;