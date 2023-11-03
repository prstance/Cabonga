import { Component, For, Show, createMemo } from "solid-js";
import Box from "./box";
import { getMonth } from "@/utils";
import { authStore } from "@/stores/auth";
import { agendaDayType } from "@/types";

const AgendaBox: Component = () => {
  const date = new Date();
  const currentMonthNbr = date.getMonth() + 1;
  const calendar = createMemo(() => authStore.agenda);
  const isGray = (day: agendaDayType) => {
    if (day.event === null) return true;
    if (day.today === true) return false;
    if (day.weekday === true) return true;
    return false;
  };

  const description = () => {
    const month = getMonth(currentMonthNbr)
    const firstLetter = month.charAt(0).toLowerCase()
    if (['a', 'e', 'i', 'o', 'u'].includes(firstLetter)) return "Agenda d'" + month
    return "Agenda de " + month
  }

  return (
    <Box title="Agenda" description={description()} path="/agenda">
      <div class="mt-4 flex flex-col">
        <div class="mb-2 flex justify-between">
          <div class="w-[14.2857143%] flex justify-center flex-items-center text-3 font-600">
            LUN
          </div>
          <div class="w-[14.2857143%] flex justify-center flex-items-center text-3 font-600">
            MAR
          </div>
          <div class="w-[14.2857143%] flex justify-center flex-items-center text-3 font-600">
            MER
          </div>
          <div class="w-[14.2857143%] flex justify-center flex-items-center text-3 font-600">
            JEU
          </div>
          <div class="w-[14.2857143%] flex justify-center flex-items-center text-3 font-600">
            VEN
          </div>
          <div class="w-[14.2857143%] flex justify-center flex-items-center text-3 font-600">
            SAM
          </div>
          <div class="w-[14.2857143%] flex justify-center flex-items-center text-3 font-600">
            DIM
          </div>
        </div>
        <For each={calendar()}>
          {week => (
            <div class="flex justify-between">
              <For each={week}>
                {day => {
                  const date = new Date(day.date);
                  return (
                    <Show when={isGray(day)} fallback={
                      <Show when={day.today} fallback={
                        <div class="aspect-ratio-1 w-[14.2857143%] flex justify-center flex-items-center text-4 font-600">
                          {date.getDate()}
                        </div>
                      }>
                        <div class="relative aspect-ratio-1 w-[14.2857143%] flex justify-center flex-items-center text-4 font-600 c-white">
                          <p class="relative z-3">{date.getDate()}</p>
                          <div class="absolute z-2 h-8 w-8 b-rd-1.7 bg-primary"/>
                        </div>
                      </Show>
                    }>
                      <div class="aspect-ratio-1 w-[14.2857143%] flex justify-center flex-items-center text-4 font-600 c-gray3">
                        {date.getDate()}
                      </div>
                    </Show>
                  );
                }}
              </For>
            </div>
          )}
        </For>
      </div>
    </Box>
  );
};

export default AgendaBox;
