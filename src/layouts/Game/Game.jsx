import { Outlet } from "react-router-dom";
import Resources from "./components/Resources";

const Game = () => {
  return (
    <>
      <header className="fixed flex p-3 top-0 left-0 w-full justify-between">
        <div></div>
        <Resources />
      </header>
      <Outlet />
    </>
  );
};

export default Game;