import { ParentComponent, Show } from "solid-js";
import { LoggedRoute } from "../auth/auth-routes";
import TitleBar from "./titlebar";
import Navbar from "./navbar";

const Page: ParentComponent<{text: string | undefined; protected?: boolean; ref?: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined}> = props => {

  return (
    <>
      <Show when={props.protected} fallback={
        <PageContent text={props.text} ref={props.ref}>
          {props.children}
        </PageContent>
      }>
        <LoggedRoute>
          <PageContent text={props.text} ref={props.ref}>
            {props.children}
          </PageContent>
        </LoggedRoute>
      </Show>
    </>
  );
};

const PageContent: ParentComponent<{text: string | undefined; ref?: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined}> = props => {
  return (
    <main class="min-h-screen overflow-hidden bg-gray2">
      <TitleBar text={props.text} />
      <div ref={props.ref} class="overflow-x-hidden px-5" style={{"max-height": "calc(100vh - 60px - 86px"}}>
        <div class="h-5" />
        {props.children}
        <div class="h-5" />
      </div>
      <Navbar />
    </main>
  );
};

export default Page;
