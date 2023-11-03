import { authStore } from "@/stores/auth";
import { diaryType } from "@/types";
import { Component, For, Show, createMemo } from "solid-js";
import Box from "./box";

const DiaryBox: Component = () => {
  const diary = createMemo(() => authStore.diary);

  const hasDiary = () => {
    if (diary()) {
      return (diary() as diaryType[]).length <= 0;
    }
    else {
      return false;
    }
  };

  return (
    <Box title="Journal de classe" description="Ce que tu as à faire pour aujourd'hui" path="/diary">
      <Show when={hasDiary()}>
        <p class="mt-4 text-3 font-600">Rien de prévu aujourd'hui</p>
      </Show>
      <For each={diary()}>
        {item => <DiaryItem data={item} />}
      </For>
    </Box>
  );
};

export default DiaryBox;

const DiaryItem: Component<{data: diaryType}> = props => {
  return (
    <li class="flex py-4" style={{"border-bottom": "1px solid #D9D9D975"}}>
      <p class="min-w-[25%] text-3 font-500">{props.data.hour.replace(":", "h")}</p>
      <div>
        <Show when={props.data.homeworkDone} fallback={
          <p class="mb-2 text-3 font-600">{props.data.lessonName}</p>
        }>
          <div class="flex">
            <p class="mb-2 mr-3 text-3 font-600">{props.data.lessonName}</p>
            <HomeworkDoneBadge/>
          </div>
        </Show>
        <p class="text-2.75 font-500 c-gray1">{props.data.lessonSubject}</p>
      </div>
    </li>
  );
};

const HomeworkDoneBadge: Component = () => {
  return (
    <div class="h-4 w-13 flex justify-center flex-items-center b-rd-4 bg-secondary text-2 font-700">TERMINÉ</div>
  );
};
