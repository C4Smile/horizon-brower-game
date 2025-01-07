/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// components
import Dialog from "../Dialogs/Dialog/Dialog";

// providers
import { useActionPanel } from "../../providers/ActionPanelProvider";

function Panel(props) {
  const { children, id } = props;

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

  return (
    <Dialog show={openDialog} onClose={onClose} hideCloseButton>
      <section
        id={`${id}-panel`}
        className="relative p-4 rounded-lg bg-ocean min-w-[350px] max-w-[600px] min-h-[400px]"
      >
        <button
          type="button"
          className="right-3 top-3 absolute text-xl text-light-primary hover:text-error"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        {children}
      </section>
    </Dialog>
  );
}

export default Panel;
