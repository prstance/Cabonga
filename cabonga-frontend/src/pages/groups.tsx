import Page from "@/components/native/page";
import { authStore } from "@/stores/auth";
import { groupType } from "@/types";
import { comingSoonToast } from "@/utils";
import { useNavigate } from "@solidjs/router";
import { Component, For, createMemo, createSignal } from "solid-js";

const Groups: Component = () => {
  const [searchValue, setSearchValue] = createSignal("");
  const groups = createMemo(() => authStore.groups);
  return (
    <Page text="Groupes" protected>
      <div class="flex justify-between flex-items-center">
        <div class="h-12.5 w-full flex flex-items-center b-rd-5 bg-white">
          <img class="mx-3 h-5" src="/assets/search.svg" alt="search" />
          <input onInput={e => setSearchValue(e.currentTarget.value)} value={searchValue()} class="h-full w-full b-0 bg-transparent pr-3 outline-none placeholder:text-3 placeholder:font-500 placeholder:c-gray3" type="text" placeholder="Rechercher" />
        </div>
        <div onClick={comingSoonToast} class="ml-5 h-12.5 min-w-12.5 flex justify-center flex-items-center b-rd-5 bg-primary">
          <img src="/assets/group.svg" alt="group" />
        </div>
      </div>

      <For each={groups()}>
        {group => (
          <>
            <div class="h-5" />
            <Group data={group} />
          </>
        )}
      </For>
    </Page>
  );
};

export default Groups;

const Group: Component<{data: groupType}> = props => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(props.data.slug)} class="h-15.5 flex flex-items-center b-rd-5 bg-white p-3.5">
      <div class="h-full w-15.5 b-rd-5 bg-red" style={{"background": `url(${props.data.image}) center/cover no-repeat`}} />
      <div class="ml-3.5 h-full w-[70%]">
        <p class="text-5 font-600">{props.data.name}</p>
        <p class="mt-1 text-2.75 font-500">Something...</p>
      </div>
    </div>
  );
};
