import { useMemo } from "react";

// components
import Toolbar from "./Toolbar/Toolbar";
import Panel from "../../../components/PanelCard/Panel";

// providers
import { useActionPanel } from "../../../providers/ActionPanelProvider";

// panels
import Buildings from "../Buildings/Buildings";
import Ships from "../Ships/Ships";
import Techs from "../Techs/Techs";
import Forge from "../Forge/Forge";

const Actions = {
  Buildings: "buildings",
  Ships: "ships",
  Techs: "techs",
  Guns: "guns",
};

export default function Footer() {
  const { showPanel } = useActionPanel();

  const dialog = useMemo(() => {
    switch (showPanel) {
      case Actions.Buildings:
        return <Buildings />;
      case Actions.Ships:
        return <Ships />;
      case Actions.Techs:
        return <Techs />;
      default:
        return <Forge />;
    }
  }, [showPanel]);

  return (
    <>
      <Panel>{dialog}</Panel>
      <footer className="flex p-3 w-full justify-between">
        <div></div>
        <Toolbar />
      </footer>
    </>
  );
}
