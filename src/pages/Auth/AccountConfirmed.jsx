import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCookie, createCookie } from "some-javascript-utils/browser";
import { AccountStatus } from "./SignedUp";

// provider
import { useHorizonApiClient } from "../../providers/HorizonApiProvider";

// config
import config from "../../config";
import Loading from "../../partials/loading/Loading";

function AccountConfirmed() {
  const horizonApiClient = useHorizonApiClient();

  const navigate = useNavigate();

  const search = useSearchParams();

  const { t } = useTranslation();

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);

  const validate = async () => {
    try {
      const [URLSearchParams] = search;
      if (URLSearchParams.get("token")) {
        const result = await horizonApiClient.User.validateEmail(URLSearchParams.get("token"));
        if (result.status === 201) {
          createCookie(config.validating, 1, AccountStatus.validated);
          setValidated(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const cookie = getCookie(config.validating);
    switch (cookie) {
      case AccountStatus.validating:
        validate();
        break;
      default:
        return navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-ocean p-10 flex flex-col gap-5 items-center rounded-md">
        {loading ? (
          <Loading color="stroke-light-primary" />
        ) : (
          <>
            <h1 className="text-light-primary text-3xl text-center">
              {t("_pages:auth.accountConfirmed.title")}
            </h1>
            <p className="max-w-64 text-center text-white">
              {t(
                validated
                  ? "_pages:auth.accountConfirmed.body"
                  : "_accessibility:messages.notValidated",
              )}
            </p>
            <Link to="/auth" className="submit text-light-primary !border-light-primary">
              {t(validate ? "_pages:auth.accountConfirmed.start" : "_accessibility:buttons.goHome")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountConfirmed;
