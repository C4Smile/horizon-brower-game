// components
import { useMemo } from "react";

// components
import Dialog from "../../../../components/Dialogs/Dialog/Dialog";

// providers
import { useActionPanel } from "../../../../providers/ActionPanelProvider";

// panels
import Buildings from "./panels/Buildings";
import Ships from "./panels/Ships";
import Techs from "./panels/Techs";
import Forge from "./panels/Forge";

const Actions = {
  Buildings: "buildings",
  Ships: "ships",
  Techs: "techs",
  Guns: "guns",
};

function ActionPanel() {
  const { showPanel, setShowPanel } = useActionPanel();

  const onClose = () => setShowPanel(null);

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
    <Dialog show={showPanel !== null} onClose={onClose} hideCloseButton>
      {dialog}
    </Dialog>
  );
}

export default ActionPanel;
