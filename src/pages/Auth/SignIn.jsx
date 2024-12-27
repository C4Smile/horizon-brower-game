import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import Logo from "../../components/Logo/Logo";
import Loading from "../../partials/loading/Loading";

// providers
import { useAccount } from "../../providers/AccountProvider";
import { useNotification } from "../../providers/NotificationProvider";
import { useHorizonApiClient } from "../../providers/HorizonApiProvider";

// pages
import { findPath, pageId } from "../sitemap";

/**
 * Sign Page
 * @returns Sign component
 */
function SignIn() {
  const { t } = useTranslation();

  const { logUser } = useAccount();

  const horizonApiClient = useHorizonApiClient();

  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [saving, setSaving] = useState(false);

  const { handleSubmit, control } = useForm();

  const { setNotification } = useNotification();

  const onSubmit = async (d) => {
    setUserError("");
    setPasswordError("");
    setSaving(true);
    try {
      const result = await horizonApiClient.User.login(d.email, d.password);
      const data = await result.json();
      // set server status to notification
      if (data.status) {
        if (data.status === 404)
          setUserError(t(`_accessibility:messages.404`, { model: t("_entities:entities.user") }));
        else if (data.status === 401 || data.status === 400)
          setPasswordError(t("_accessibility:messages.401"));
        else {
          const request = await horizonApiClient.User.fetchOwner(data.user.id);
          const horizonUser = await request.json();
          if (horizonUser) logUser({ ...data, horizonUser });
          else logUser({ ...data });
        }
      }
    } catch (e) {
      console.error(e);
      // set server status to notification
      setNotification(String(e.status ?? "notConnected"));
    }
    setSaving(false);
  };

  return (
    <div className="w-full h-screen flex items-start justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 max-sm:w-10/12 px-5 flex flex-col gap-3 items-center justify-start m-auto"
      >
        <Logo className={`w-28 h-28 mb-10`} />
        <h1 className={`w-full text-2xl md:text-3xl mb-5`}>{t("_pages:auth.signIn.title")}</h1>
        <div className={`w-full`}>
          <label>{t("_entities:user.email.label")}</label>
          <Controller
            control={control}
            disabled={saving}
            name="email"
            render={({ field }) => <input {...field} type="text" name="email" id="email" required />}
          />
          <p className="text-error">{userError}</p>
        </div>
        <div className={`w-full`}>
          <label>{t("_entities:user.password.label")}</label>
          <Controller
            control={control}
            disabled={saving}
            name="password"
            render={({ field }) => (
              <input {...field} type="password" name="password" id="password" required />
            )}
          />
          <p className="text-error">{passwordError}</p>
        </div>
        <Link to={findPath(pageId.recovery)} className={`w-full underline text-left`}>
          {t("_pages:auth.signIn.passwordRecovery")}
        </Link>
        <div className="w-full mb-5 flex gap-2">
          <button type="submit" disabled={saving} className={`mb-5 submit`}>
            {saving && (
              <Loading
                className="button-loading"
                strokeWidth="4"
                loaderClass="!w-6"
                color="stroke-white"
              />
            )}
            {t("_accessibility:buttons.submit")}
          </button>
          <Link to="sign-up" disabled={saving} className={`mb-5 submit`}>
            {t("_accessibility:buttons.signUp")}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
