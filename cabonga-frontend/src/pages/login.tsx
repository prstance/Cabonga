import { UnLoggedRoute } from "@/components/auth/auth-routes";
import { setCode, setDescription, setToggleErrorPage } from "@/components/native/error-page";
import { getAuthTokens } from "@/stores/api";
import { comingSoonToast } from "@/utils";
import { Component, createSignal, Show } from "solid-js";

const Login: Component = () => {

  const [emailValue, setEmailValue] = createSignal("mathieu.romain@ind-thuin.be");
  const [passwordValue, setPasswordValue] = createSignal("ArkerSw2007##");
  const [error, setError] = createSignal<string | null>(null);

  const handleClick = async () => {
    console.log(`Trying to login as %c${emailValue()}`, "color:blue");
    const response = await getAuthTokens(emailValue(), passwordValue());
    if (response.status !== "ok") {
      switch (response.message) {
        case "WHITELIST_ERROR":
          setCode("Accès refusé")
          setDescription("Il semblerait que vous n’êtes pas dans la whitelist")
          setToggleErrorPage(true)
          break;
        default:
          setError(response.message);
          break;
      }
      
    }
    else {
      window.login(response.data);
    }
    // Reset inputs
    setEmailValue("");
    setPasswordValue("");
  };

  return (
    <UnLoggedRoute>
      <main class="h-screen flex justify-center flex-items-center bg-white">
        <div class="h-[70%] max-h-110 max-w-sm w-[70%] flex flex-col justify-between flex-items-center">
          <div class="text-center">
            <h1 class="text-6 font-700 c-primary">CABONGA</h1>
            <h2 class="mt-2 text-3.25 font-600 c-gray1">Veuillez remplir tous les détails</h2>
          </div>
          <div class="w-full flex flex-col">
            <input onInput={e => setEmailValue(e.currentTarget.value)} value={emailValue()} class="mb-2.5 h-11.5 b-2 b-primary b-rd-[50px] px-5 font-500 c-primary outline-none placeholder:text-3 placeholder:font-600" type="text" placeholder="E-mail" />
            <input onInput={e => setPasswordValue(e.currentTarget.value)} value={passwordValue()} class="h-11.5 b-2 b-primary b-rd-[50px] px-5 font-500 c-primary outline-none placeholder:text-3 placeholder:font-600" type="password" placeholder="Mot de passe"  />
            <Show when={error()}>
              <strong>{error()}</strong>
            </Show>
            <span onClick={comingSoonToast} class="mt-3 text-center text-3.5 font-600 c-primary">Mot de passe oublié?</span>
          </div>
          <div onClick={handleClick} class="h-11.5 w-full flex justify-center flex-items-center b-rd-[50px] bg-primary text-3.25 font-600 c-white">SE CONNECTER</div>
        </div>
      </main>
    </UnLoggedRoute>
  );
};

export default Login;
