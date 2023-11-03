import { authStoreTypes } from "@/types";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

const [lastRoute, setLastRoute] = createSignal<string | undefined>();


const [authStore, setAuthStore] = createStore<authStoreTypes>({
  isAuthenticated: false,
  authTokens: null,
  decodedJWT: null,
  profile: null,
  diary: null,
  evaluations: null,
  agenda: null,
  groups: null,
  group: null
});

const clearData = () => {
  setAuthStore({
    isAuthenticated: false,
    authTokens: null,
    decodedJWT: null,
    profile: null,
    diary: null,
    evaluations: null,
    agenda: null,
    groups: null,
    group: null
  });
  window.clear();
};

export { authStore, setAuthStore, lastRoute, setLastRoute, clearData};
