const {
  VITE_API_URL,
  VITE_API_PHOTO,
  VITE_API_SOCKET,
  // cookies
  VITE_LANGUAGE,
  VITE_BASIC_KEY,
  VITE_ACCEPT_COOKIE,
  VITE_DECLINE_COOKIE,
  VITE_USER,
  VITE_USER_PHOTO,
  VITE_USER_NATION,
  VITE_USER_NICK,
  VITE_USER_STATE,
  VITE_VALIDATION_COOKIE,
  VITE_RECOVERING_COOKIE,
} = import.meta.env;

const config = {
  apiUrl: VITE_API_URL,
  apiPhoto: VITE_API_PHOTO,
  apiSocket: VITE_API_PHOTO,
  // cookie
  language: VITE_LANGUAGE,
  basicKey: VITE_BASIC_KEY,
  accept: VITE_ACCEPT_COOKIE,
  decline: VITE_DECLINE_COOKIE,
  user: VITE_USER,
  userPhoto: VITE_USER_PHOTO,
  userNation: VITE_USER_NATION,
  userNick: VITE_USER_NICK,
  userState: VITE_USER_STATE,
  validating: VITE_VALIDATION_COOKIE,
  recovering: VITE_RECOVERING_COOKIE,
};

export default config;
