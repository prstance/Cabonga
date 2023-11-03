import { fetchData, getProfile, getRefreshTokens } from "@/stores/api";
import { authStore, clearData, setAuthStore } from "@/stores/auth";
import { authTokensType, decodedJwtType } from "@/types";
import { createStorage } from "@solid-primitives/storage";
import { makeTimer } from "@solid-primitives/timer";
import jwt_decode from "jwt-decode";
import { Component, ParentComponent, createEffect, createSignal, on, onMount, Show } from "solid-js";

declare global {
  interface Window { clear: () => void; login: (authTokens: authTokensType) => void }
}

const AuthWrapper: ParentComponent = props => {
  const [authStorage, setAuthStorage, {clear}] = createStorage({ api: localStorage, prefix: "user", serializer: (value: object) => JSON.stringify(value), deserializer: (value: string) => JSON.parse(value)});

  const login = (authTokens: authTokensType) => {
    setAuthStorage("auth", authTokens);
  };

  const [logged, setLogged] = createSignal(false);

  onMount(() => {
    window.clear = clear;
    window.login = login;
  });

  createEffect(on(() => authStorage.auth, async () => {
    setAuthStore({authTokens: (authStorage.auth as authTokensType)});
    if (!authStore.authTokens?.access) {
      clearData();
    }
    else {
      console.log("Access Token found");
      const response = await getProfile(() => authStore.authTokens!.access);
      if (response.status !== "ok") {
        setLogged(false);
        clearData();
      }
      else {
        const decodedJWT: decodedJwtType = jwt_decode(authStore.authTokens?.access);
        setAuthStore({isAuthenticated: true, profile: response.data, decodedJWT: decodedJWT});
        setLogged(true);
      }
    }
  }));

  const [canGetData, setCanGetData] = createSignal(false);

  createEffect(on(() => authStore.isAuthenticated, () => {
    if (authStore.isAuthenticated && canGetData() !== true) {
      setCanGetData(true);
    }
  }));

  createEffect(on(() => canGetData(), async () => {
    if (canGetData()) {
      const accessToken = String(authStore.authTokens?.access);
      const engineToken = String(authStore.authTokens?.engine);
      const school = String(authStore.profile?.schoolId);
      const student = String(authStore.profile?.id);
      await fetchData(accessToken, engineToken, school, student);
    }
  }));

  return (
    <>
      <Show when={logged()}>
        <RefreshTimer/>
      </Show>
      {props.children}
    </>
  );
};

export default AuthWrapper;


const RefreshTimer: Component = () => {
  const refreshCallback = async () => {
    const refreshToken = String(authStore.authTokens?.refresh);
    const newAuthTokens = await getRefreshTokens(() => refreshToken);
    window.login(newAuthTokens);
  };

  makeTimer(refreshCallback, 295000, setInterval);

  return <></>;
};
