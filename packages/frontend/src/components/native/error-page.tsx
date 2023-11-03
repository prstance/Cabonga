import { comingSoonToast } from "@/utils";
import { Motion } from "@motionone/solid";
import { Component, Show, createSignal } from "solid-js";

const [toggleErrorPage, setToggleErrorPage] = createSignal(false)
const [code, setCode] = createSignal("Nos excuses")
const [description, setDescription] = createSignal("Il semblerait que nous rencontrons un problème")

const ErrorPage: Component = () => {
  return (
    <Show when={toggleErrorPage()}>
      <Motion.div
        exit={{ opacity: [1, 0] }}
        transition={{duration: .2, easing: "ease-in-out"}}
        class="absolute bottom-0 left-0 right-0 top-0 z-9998 flex flex-col justify-center flex-items-center bg-white">
          <div class="h-[75%] w-[90%] flex flex-col justify-between flex-items-center">
            <div class="flex flex-col flex-items-center">
              <img class="w-[80%] mb-25" src="/assets/illustration3.svg" alt="illustration" />
              <div class="text-center">
                <h1 class="font-700 text-5 c-primary mb-3">{code()}</h1>
                <h2 class="font-600 text-3.5 c-gray1">{description()}</h2>
              </div>
            </div>
            <div onClick={comingSoonToast} class="h-13 w-36 bg-primary b-rd-5 flex flex-items-center justify-center c-white font-500 text-3.5">Rejoindre</div>
          </div>
      </Motion.div>
    </Show>
  );
};

export { ErrorPage, setToggleErrorPage, setCode, setDescription};
