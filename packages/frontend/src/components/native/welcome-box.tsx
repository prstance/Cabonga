import { authStore } from "@/stores/auth";
import { userType } from "@/types";
import { comingSoonToast } from "@/utils";
import { Component, createMemo } from "solid-js";

const WelcomeBox: Component = () => {
  const user = createMemo(() => (authStore.profile as userType));

  return (
    <section class="relative h-28.75 flex b-rd-4 bg-primary">
      <div class="ml-5 h-full flex flex-col justify-center c-white">
        <h3 class="text-2.5 font-300">Bienvenue</h3>
        <h2 class="mb-4 mt-1.5 text-3.75 font-600">{user().firstName} {user().lastName}</h2>
        <h3 onClick={comingSoonToast} class="text-2.5 font-300">Reprendre là où vous en étiez &rarr;</h3>
      </div>
      <img class="absolute top-[50%] h-[120%] -right-5" src="/assets/illustration2.svg" alt="illustration" style={{transform: "translateY(-50%)"}} />
    </section>
  );
};

export default WelcomeBox;
