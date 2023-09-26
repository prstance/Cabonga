import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import { lazy } from "solid-js";
const Login = lazy(() => import("@/pages/login"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Groups = lazy(() => import("@/pages/groups"));
const Chat = lazy(() => import("@/pages/chat"));

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/dashboard",
    component: Dashboard
  },
  // {
  //   path: "/groups",
  //   component: Groups
  // },
  // {
  //   path: "/groups/:slug",
  //   component: Chat
  // }
];
