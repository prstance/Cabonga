import { useMatch, useNavigate } from "@solidjs/router";
import { Component, For, Show } from "solid-js";

const Navbar: Component = () => {

  const routes = () => [
    {name: "Accueil", path: "/dashboard", inactive: "/assets/navicons/home.svg", active:"/assets/navicons/homeblue.svg"},
    {name: "Messages", path: "/groups", inactive: "/assets/navicons/messages.svg", active:"/assets/navicons/messagesblue.svg"},
    {name: "Évaluations", path: "/evaluations", inactive: "/assets/navicons/evals.svg", active:"/assets/navicons/evalsblue.svg"},
    {name: "Agenda", path: "/agenda", inactive: "/assets/navicons/agenda.svg", active:"/assets/navicons/agendablue.svg"}
  ];

  const navigate = useNavigate();

  return (
    <>
      <div class="h-21.5"/>
      <nav class={"fixed bottom-0 left-0 right-0 bg-red h-21.5 flex justify-center flex-items-center"}>
        <ul class="h-full w-full flex justify-around flex-items-center bg-white">
          <For each={routes()}>
            {route => {
              const match = useMatch(() => route.path);
              return (
                <li onClick={() => navigate(route.path)} class="relative flex flex-col flex-items-center">
                  <Show when={Boolean(match())} fallback={
                    <img class="mb-5 w-8" src={route.inactive} alt="" />
                  }>
                    <img class="mb-5 w-8" src={route.active} alt="" />
                  </Show>
                  <p class="absolute bottom-0 text-2.5 font-500 c-gray1">
                    {route.name}
                  </p>
                </li>
              );
            }}
          </For>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
