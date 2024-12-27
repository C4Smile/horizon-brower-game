import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { createCookie } from "some-javascript-utils/browser";

// components
import Logo from "../../components/Logo/Logo";
import Loading from "../../partials/loading/Loading";

// providers
import { useAccount } from "../../providers/AccountProvider";
import { useNotification } from "../../providers/NotificationProvider";
import { useHorizonApiClient } from "../../providers/HorizonApiProvider";

// pages
import { findPath, pageId } from "../sitemap";

// config
import config from "../../config";
import { AccountStatus } from "./SignedUp";

/**
 * Sign Page
 * @returns Sign component
 */
function SignUp() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { logUser } = useAccount();

  const horizonApiClient = useHorizonApiClient();

  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [saving, setSaving] = useState(false);

  const { handleSubmit, control } = useForm({ email: "", password: "", rPassword: "" });

  const { setNotification } = useNotification();

  const onSubmit = async (d) => {
    setUserError("");
    setPasswordError("");
    if (d.password !== d.rPassword) {
      setPasswordError(t("_accessibility:errors.passwordDoNotMatch"));
      return;
    }
    setSaving(true);

    try {
      const result = await horizonApiClient.User.signUp(d.email, d.password);
      const data = await result.json();
      // set server status to notification
      if (data.status) {
        if (data.status === 409)
          setUserError(t(`_accessibility:messages.409`, { model: t("_entities:entities.user") }));
        else {
          const request = await horizonApiClient.User.fetchOwner(data.user.id);
          const horizonUser = await request.json();
          if (horizonUser) logUser({ ...data, horizonUser });
          else logUser({ ...data });
          createCookie(config.validating, 30, AccountStatus.validating);
          navigate(findPath(pageId.signedUp));
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
        className="w-96 max-sm:w-10/12 px-5 flex flex-col gap-2 items-center justify-start m-auto"
      >
        <Logo className={`w-28 h-28 mb-10`} />
        <h1 className={`w-full text-2xl md:text-3xl mb-5`}>{t("_pages:auth.signUp.title")}</h1>
        <div className={`w-full`}>
          <label>{t("_entities:user.email.label")}</label>
          <Controller
            control={control}
            disabled={saving}
            name="email"
            render={({ field: { value, ...rest } }) => (
              <input {...rest} value={value ?? ""} type="email" name="email" id="email" required />
            )}
          />
          <p className="text-error">{userError}</p>
        </div>
        <div className={`w-full`}>
          <label>{t("_entities:user.password.label")}</label>
          <Controller
            control={control}
            disabled={saving}
            name="password"
            render={({ field: { value, ...rest } }) => (
              <input
                {...rest}
                value={value ?? ""}
                type="password"
                name="password"
                id="password"
                required
              />
            )}
          />
        </div>
        <div className={`w-full`}>
          <label>{t("_entities:user.rPassword.label")}</label>
          <Controller
            control={control}
            disabled={saving}
            name="rPassword"
            render={({ field: { value, ...rest } }) => (
              <input
                {...rest}
                value={value ?? ""}
                type="password"
                name="rPassword"
                id="rPassword"
                required
              />
            )}
          />
          <p className=" text-error">{passwordError}</p>
        </div>
        <div className="w-full mb-5 flex gap-2">
          <button type=" submit" disabled={saving} className={`mb-5 submit`}>
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
          <Link to="/auth" disabled={saving} className={`mb-5 submit`}>
            {t("_accessibility:buttons.signIn")}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
