import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function AccountConfirmed() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-ocean p-10 flex flex-col gap-5 items-center rounded-md">
        <h1 className="text-light-primary text-3xl text-center">
          {t("_pages:auth.accountConfirmed.title")}
        </h1>
        <p className="max-w-64 text-center text-white">{t("_pages:auth.accountConfirmed.body")}</p>
        <Link to="/auth" className="submit text-light-primary !border-light-primary">
          {t("_pages:auth.accountConfirmed.start")}
        </Link>
      </div>
    </div>
  );
}

export default AccountConfirmed;
