/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";

function Tabs(props) {
  const { t } = useTranslation();

  const { tabs, currentTab, onChange } = props;

  return (
    <ul className="flex gap-4">
      {tabs?.map((tab) => (
        <li key={tab.id}>
          <button
            type="button"
            aria-label={t("_accessibility:buttons.openTab.aria", { tab: tab.name })}
            name={tab.name}
            onClick={(e) => onChange(e, tab.id)}
            className={currentTab === tab.id ? "text-light-primary" : "text-white"}
          >
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
