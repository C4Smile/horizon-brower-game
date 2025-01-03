import { Outlet } from "react-router-dom";
import Resources from "./components/Resources/Resources.jsx";

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