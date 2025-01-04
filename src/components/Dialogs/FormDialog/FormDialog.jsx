/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

// components
import Dialog from "../Dialog/Dialog";

/**
 *
 * @param {object} props component properties
 * @returns FormDialog component
 */
function FormDialog(props) {
  const { t } = useTranslation();

  const { dialogProps, onSubmit, children } = props;

  const { show, onClose } = dialogProps;

  return (
    <Dialog show={show} onClose={onClose}>
      <form className="relative min-w-80 p-5 rounded-md bg-white">
        {children}
        <div className="flex items-end justify-end gap-5">
          <button type="submit" className="submit" onClick={onSubmit}>
            {t("_accessibility:buttons.save")}
          </button>
          <button type="button" className="outlined" onClick={onClose}>
            {t("_accessibility:buttons.cancel")}
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default FormDialog;
