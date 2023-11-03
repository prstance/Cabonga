import { ParentComponent, Show, createSignal } from "solid-js";
import { Navigate } from "@solidjs/router";
import { authStore } from "@/stores/auth";


const [authRoute, setAuthRoute] = createSignal("/dashboard");

const UnLoggedRoute: ParentComponent = props => {
  return <Show when={authStore.isAuthenticated} fallback={props.children}><Navigate href={authRoute()} /></Show>;
};

const LoggedRoute: ParentComponent = props => {
  return <Show when={authStore.isAuthenticated} fallback={<Navigate href="/login"/>}>{props.children}</Show>;
};

export {
  LoggedRoute,
  UnLoggedRoute,
  setAuthRoute,
  authRoute
};
