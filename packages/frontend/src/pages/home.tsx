import { comingSoonToast } from "@/utils";
import { useNavigate } from "@solidjs/router";
import { Component, ParentComponent } from "solid-js";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Gradient>
        <LandingSection/>
        <ContentSection/>
      </Gradient>
    </main>
  );
}

const Navbar: Component = () => {
  return (
    <nav class="h-16 flex justify-between flex-items-center bg-white px-5" style={{"border-bottom": "2px solid gray"}}>
      <div class="flex flex-items-center">
        <img onClick={comingSoonToast} class="h-[30%]" src="/assets/burger.svg" alt="menu" />
        <h1 class="ml-5 text-5 font-600">Cabonga</h1>
      </div>
      <img onClick={comingSoonToast} class="h-[30%]" src="/assets/account.svg" alt="account" />
    </nav>
  );
};

const Gradient: ParentComponent = props => {
  return (
    <div class="bg-gradient-from-white bg-gradient-to-primary/20 bg-gradient-linear shape-[90deg]">
      {props.children}
    </div>
  );
};


const LandingSection: Component = () => {
  const navigate = useNavigate();
  return (
    <section class="py-10 pl-5">
      <h2 class="mb-6 text-7.5">Votre <strong class="c-primary">Scolarité</strong><br/>à Portée de<br/>Quelques Clics</h2>
      <div onClick={() => navigate("/login")} class="h-11 w-36 flex cursor-pointer justify-center flex-items-center b-rd-[4px] bg-primary text-3 font-500 c-white">Se connecter</div>
    </section>
  );
};


const ContentSection: Component = () => {
  return (
    <main class="relative overflow-hidden pt-55">
      <img class="absolute left-[50%] top-10 w-[90%]" src="/assets/illustration.svg" alt="illustration" style={{transform: "translateX(-50%"}} />
      <img class="w-[150%]" src="/assets/wave.svg" alt="wave"/>
      <div class="bg-primary px-5 pb-5 text-3.8 c-white -mt-5">
        <h4 class="pt-7 font-300">Directeurs, préfets, votre temps est précieux</h4>
        <h3 class="pt-7 text-3.8 font-500">1. Efficacité</h3>
        <h4 class="pt-4.5 font-300 line-height-5.5">Cabonga vous permet de créer vos attributions en <b class="font-500">un temps record</b>, en ayant une vue sur les heures par enseignants et un total NTTP actualisé <b class="font-500">en direct et fiable</b>.</h4>
        <h3 class="pt-9 text-3.8 font-500">2. Préparation</h3>
        <h4 class="pt-4.5 font-300 line-height-5.5">La rentrée scolaire peut se préparer <b class="font-500">à l'avance</b> à l'aide de votre secrétariat. Une fois passée, vous pouvez vous consacrer à d'autres tâches, les enseignants seront <b class="font-500">autonomes</b> dans Cabonga.</h4>
        <h3 class="pt-9 text-3.8 font-500">3. Suivi</h3>
        <h4 class="pt-4.5 font-300 line-height-5.5">Plusieurs outils, statistiques, sont néanmoins à <b class="font-500">votre disposition</b> pour vérifier l'avancée du travail en cours d'année. (Travail collaboratif, ...)</h4>
      </div>
    </main>
  );
};
