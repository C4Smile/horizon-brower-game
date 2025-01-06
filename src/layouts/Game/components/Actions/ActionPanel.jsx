import { useEffect, useMemo, useState } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (showPanel) setOpenDialog(true);
  }, [showPanel]);

  const onClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setShowPanel(null);
    }, 400);
  };

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
    <Dialog show={openDialog} onClose={onClose} hideCloseButton>
      <section
        id={`${dialog}-panel`}
        className="relative p-4 rounded-lg bg-ocean min-w-[350px] max-w-[600px] min-h-[400px]"
      >
        <button
          type="button"
          className="right-3 top-3 absolute text-xl text-light-primary hover:text-error"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        {dialog}
      </section>
    </Dialog>
  );
}

export default ActionPanel;
