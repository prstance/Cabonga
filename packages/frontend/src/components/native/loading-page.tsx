import { Motion } from "@motionone/solid";
import { Component } from "solid-js";
import "@/styles/loader.css";

const LoadingPage: Component = () => {
  return <Motion.div
    exit={{ opacity: [1, 0] }}
    transition={{duration: .2, easing: "ease-in-out"}}
    class="absolute bottom-0 left-0 right-0 top-0 z-9999 flex flex-col justify-center flex-items-center bg-white">
    <div class="lds-ripple"><div /><div /></div>
  </Motion.div>;
};

export default LoadingPage;
