/* @refresh reload */
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@/styles/globals.css";
import "virtual:uno.css";
import { render } from "solid-js/web";
import { Router, useBeforeLeave, useLocation, useRoutes } from "@solidjs/router";
import { routes } from "./routes";
import { createMemo, onCleanup, onMount, ParentComponent, Show, Suspense } from "solid-js";
import { mobile, setWidth } from "./stores/responsive";
import { Toaster } from "solid-toast";
import { setAuthRoute } from "./components/auth/auth-routes";
import LoadingPage from "./components/native/loading-page";
import { Presence } from "@motionone/solid";
import AuthWrapper from "./components/auth/auth-wrapper";
import { ErrorPage } from "./components/native/error-page";

export default function RootRender () {
  const Routes = useRoutes(routes);

  const resizeEvent = () =>  setWidth(window.innerWidth);

  onMount(async () => {
    window.addEventListener("resize", resizeEvent);
  });

  onCleanup(() => {
    window.removeEventListener("resize", resizeEvent);
  });

  return (
    <Show when={mobile()} fallback={"only mobile"}>
      <Toaster position="top-right" gutter={8} />
      <Router>
        <AuthWrapper>
          <Presence exitBeforeEnter>
            <Suspense fallback={<LoadingPage/>}>
              <ErrorPage/>
              <BeforeLeaveAtion>
                  <Routes />
              </BeforeLeaveAtion>
            </Suspense>
          </Presence>
        </AuthWrapper>
      </Router>
    </Show>
  );
}

const BeforeLeaveAtion: ParentComponent = props => {
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  useBeforeLeave(() => {
    setAuthRoute(pathname() === "/" ? "/dashboard" : pathname());
  });

  return (
    <>
      {props.children}
    </>
  );
};

render(
  () => <RootRender />,
  document.getElementById("root") as HTMLDivElement
);
