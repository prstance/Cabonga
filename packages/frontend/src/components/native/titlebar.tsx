import { clearData } from "@/stores/auth";
import { comingSoonToast } from "@/utils";
import { Motion, Presence } from "@motionone/solid";
import { useNavigate } from "@solidjs/router";
import { Component, createSignal, For, onCleanup, onMount, Setter, Show } from "solid-js";

const TitleBar: Component<{text: string | undefined}> = props => {
  const [dropdownOpen, setDropdownOpen] = createSignal(false);

  let dropdownRef: HTMLUListElement | undefined;
  let profileRef: HTMLImageElement | undefined;

  const listener = (event: MouseEvent | TouchEvent) => {
    if (
      !dropdownRef ||
      !profileRef ||
      dropdownRef.contains((event.target as Element)) ||
      profileRef.contains((event.target as Element))
    ) {
      return;
    }
    setDropdownOpen(false);
  };

  onMount(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
  });

  onCleanup(() => {
    document.removeEventListener("mousedown", listener);
    document.removeEventListener("touchstart", listener);
  });

  return <div class="relative h-15 flex flex-items-center bg-white pl-5">
    <img ref={profileRef} onClick={() => setDropdownOpen(!dropdownOpen())} class="w-10 b-rd-[50%]" src="/assets/default.jpg" alt="profile-picture" />
    <Presence exitBeforeEnter>
      <Show when={dropdownOpen()}>
        <MenuDropdown setter={setDropdownOpen} ref={dropdownRef}/>
      </Show>
    </Presence>
    <h1 class="ml-5 text-5 font-600">{props.text}</h1>
  </div>;
};

export default TitleBar;

const MenuDropdown: Component<{setter: Setter<boolean>; ref: HTMLUListElement | undefined}> = props => {
  const navigate = useNavigate();
  const logout = () => {
    clearData();
    navigate("/");
  };

  const items = [
    {src: "/assets/titlebaricons/premium.svg", text: "Essayer la version premium", hoverColor: "#ff0000", action: comingSoonToast},
    {src: "/assets/titlebaricons/link.svg", text: "Site officiel", hoverColor: "#ff0000", action: () => window.open("https://www.cabanga.be/", "_blank")},
    {src: "/assets/titlebaricons/group.svg", text: "Changer de compte", hoverColor: "#ff0000", action: clearData},
    {src: "/assets/titlebaricons/logout.svg", text: "Déconnexion", hoverColor: "#ff0000", action: logout}
  ];

  const handleClick = (action: () => unknown) => {
    props.setter(false);
    action();
  };

  return (
    <Motion.ul
      exit={{opacity: [1, 0]}}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: .1, easing: "ease-in-out" }}
      ref={props.ref} class="absolute top-17 z-1024 b-rd-2 bg-white px-3.5 pb-3.5 shadow-lg">
      <div class="arrow-up absolute left-3.8" />
      <For each={items}>
        {item => (
          <li onClick={() => handleClick(item.action)} class="mt-3.5 flex cursor-pointer flex-items-center">
            <img class="mr-3 aspect-ratio-1 h-3.2" src={item.src} alt="item" />
            <p class="text-3.5 c-[#666666] hover:c-black">{item.text}</p>
          </li>
        )}
      </For>
    </Motion.ul>
  );
};
