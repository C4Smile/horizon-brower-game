// layouts
import Auth from "../layouts/Auth";

// pages
// auth
import SignOut from "./Auth/SignOut";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Recovery from "./Auth/Recovery";
import UpdatePassword from "./Auth/UpdatePassword";
import Home from "./Home.jsx";
import Game from "./Game/Game.jsx";

export const pageId = {
  auth: "auth",
  signOut: "signOut",
  signIn: "signIn",
  signUp: "signUp",
  recovery: "recover",
  updatePassword: "updatePassword",
  dashboard: "dashboard",
  home: "home",
  settings: "settings"
};

export const sitemap = [
  {
    key: pageId.auth,
    component: <Auth />,
    path: "/auth",
    children: [
      {
        key: pageId.signIn,
        path: "/",
        component: <SignIn />
      },
      {
        key: pageId.signUp,
        path: "/sign-up",
        component: <SignUp />
      },
      {
        key: pageId.recovery,
        path: "/recover",
        component: <Recovery />
      },
      {
        key: pageId.updatePassword,
        path: "/update-password",
        component: <UpdatePassword />
      }
    ]
  },
  {
    key: pageId.dashboard,
    component: <Game />,
    path: "/game"
  },
  {
    key: pageId.home,
    component: <Home />,
    path: "/"
  },
  {
    key: pageId.signOut,
    component: <SignOut />,
    path: "/sign-out"
  }
];

/**
 *
 * @param {*} targetPageId target page
 * @param {*} basePage parent page
 * @param {*} currentPath current path
 * @returns path
 */
export const findPathInChildren = (targetPageId, basePage, currentPath = "") => {
  let path = "";
  for (let i = 0; i < basePage.children.length; ++i) {
    const page = basePage.children[i];
    if (page.key === targetPageId) return (path = `${currentPath}${page.path}`);

    if (page.children) {
      path = findPathInChildren(targetPageId, page, currentPath + page.path);
      if (path) return currentPath + page.path;
    }
  }
  return path;
};

/**
 *
 * @param {*} targetPageId target page
 * @returns complete bath
 */
export const findPath = (targetPageId) => {
  let path = "";
  for (let i = 0; i < sitemap.length; i++) {
    const page = sitemap[i];
    if (page.key === targetPageId) return page.path;
    if (page.children) {
      path = findPathInChildren(targetPageId, page, page.path === "/" ? "" : page.path);
      if (path) {
        break;
      }
    }
  }
  return path;
};
