/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "some-javascript-utils/browser";

// config
import config from "../../config";

export const AccountStatus = {
  validating: "1",
  validated: "2",
};

function SignedUp() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    switch (true) {
      case getCookie(config.validating) === AccountStatus.validating:
        break;
      case getCookie(config.validating) === AccountStatus.validated:
      default:
        return navigate("/");
    }
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-ocean p-10 flex flex-col gap-5 items-center rounded-md">
        <h1 className="text-light-primary text-3xl text-center">{t("_pages:auth.signedUp.title")}</h1>
        <p className="max-w-64 text-center text-white">{t("_pages:auth.signedUp.body")}</p>
        <Link to="/auth" className="submit text-light-primary !border-light-primary">
          {t("_accessibility:buttons.signIn")}
        </Link>
      </div>
    </div>
  );
}

export default SignedUp;
