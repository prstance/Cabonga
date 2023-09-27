import AgendaBox from "@/components/native/agenda-box";
import DiaryBox from "@/components/native/diary-box";
import EvaluationsBox from "@/components/native/evaluations-box";
import Page from "@/components/native/page";
import WelcomeBox from "@/components/native/welcome-box";
import { Component } from "solid-js";

const Dashboard: Component = () => {
  return (
    <Page text="Accueil" protected>
      <WelcomeBox/>
      <div class="h-5" />
      <DiaryBox/>
      <div class="h-5" />
      <EvaluationsBox/>
      <div class="h-5" />
      <AgendaBox/>
    </Page>
  );
};

export default Dashboard;
