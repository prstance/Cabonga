import { Component, For, Show, createMemo } from "solid-js";
import Box from "./box";
import { evaluationType } from "@/types";
import { authStore } from "@/stores/auth";

const EvaluationsBox: Component = () => {
  const evaluations = createMemo(() =>
    Array.isArray(authStore.evaluations) && authStore.evaluations.length > 10
      ? authStore.evaluations.slice(0, 10)
      : authStore.evaluations);

  const hasEvaluations = () => {
    if (evaluations()) {
      return (evaluations() as evaluationType[]).length <= 0;
    }
    else {
      return false;
    }
  };

  return (
    <Box title="Évaluations" description="Tes récentes évaluations" path="/evaluations">
      <Show when={hasEvaluations()}>
        <p class="mt-4 text-3 font-600">Aucune évaluation!</p>
      </Show>
      <For each={evaluations()}>
        {item => <EvaluationItem data={item} />}
      </For>
    </Box>
  );
};

export default EvaluationsBox;

const EvaluationItem: Component<{data: evaluationType}> = props => {
  const date = () => new Date(props.data.date);
  const day = () => date().getDate();
  const month = () => date().getMonth() + 1;

  const formatNumber = (nbr: number) => {
    return nbr < 10 ? "0" + nbr.toString() : nbr.toString();
  };

  const calculatePts = () => {
    let score = parseFloat(props.data.score.toString()).toFixed(1).trim();
    if (score.slice(-1) === "0") {
      score = score.slice(0, -2);
    }

    const maximumScore = props.data.maximumScore;
    return score + "/" + maximumScore;
  };

  return (
    <li class="flex py-4" style={{"border-bottom": "1px solid #D9D9D975"}}>
      <p class="min-w-[25%] text-3 font-500">{formatNumber(day())}/{formatNumber(month())}</p>
      <div class="w-full">
        <div class="flex justify-between">
          <p class="mb-2 text-3 font-600">{props.data.title}</p>
          <Show when={props.data.score < props.data.maximumScore/2} fallback={
            <Show when={props.data.score === props.data.maximumScore} fallback={
              <p class="mr-4 pl-4 text-3 font-500">{calculatePts()}</p>
            }>
              <p class="mr-4 pl-4 text-3 font-500 c-green">{calculatePts()}</p>
            </Show>
          }>
            <p class="mr-4 pl-4 text-3 font-500 c-red">{calculatePts()}</p>
          </Show>
        </div>
        <p class="text-2.75 font-500 c-gray1">{props.data.code} - {props.data.subject}</p>
      </div>
    </li>
  );
};
