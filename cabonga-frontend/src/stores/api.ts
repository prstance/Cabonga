import { authTokensType } from "@/types";
import { createSignal } from "solid-js";
import { setAuthStore } from "./auth";
import { formatDate } from "@/utils";
import { URLSearchParams } from "url";

const base_url = "http://localhost:8000/v1/";

const createUrl = (endpoint: string) => `${base_url}${endpoint}/`;

const fetchJson = async (endpoint: string, endwith: string = "", headers: HeadersInit = {}) => {
  setLoadingLevel(loadingLevel() + 1);
  const response = await fetch(createUrl(endpoint) + endwith, {headers: headers});
  if (!response.ok) return Promise.reject(new Error("Error"));
  return response.json();
};

const postData = async (endpoint: string, endwith: string = "", body: object, headers: HeadersInit = {}) => {
  console.log(JSON.stringify(body))
  return (await fetch(createUrl(endpoint) + endwith, {method: "POST", body: JSON.stringify(body), headers: headers})).json();
};

const [loadingLevel, setLoadingLevel] = createSignal(0);

const fetchData = async (accessToken: string, school: string, student: string) => {
  const today = new Date();
  const diaryDate = formatDate(today);
  const authorization = () => accessToken;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + authorization()
  };

  setAuthStore({diary: (await fetchJson("diary", `?school=${school}&student=${student}&from=${diaryDate}&to=${diaryDate}`, headers)).data});
  setAuthStore({evaluations: (await fetchJson("evaluations", `?school=${school}&student=${student}&year=2022`, headers)).data});
  // setAuthStore({agenda: (await fetchJson("activities", `?school=${school}&year=${today.getFullYear()}&month=${today.getMonth() + 1}`, headers)).data});
  // setAuthStore({groups: await fetchJson("chat", "", headers)});
};

const getAuthTokens = async (email: string, password: string) => {
  return postData("token", "", {
    username: email,
    password: password
  }, { "Content-Type": "application/json" });
};

const getRefreshTokens = async (refreshToken: () => string) => {
  const authorization = () => refreshToken();
  return postData("token/refresh", "", {
    refresh: authorization()
  }, { "Content-Type": "application/json" });
};

const getProfile = async (accessToken: () => string) => {
  const authorization = () => accessToken();
  return fetchJson("profile", "", {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + authorization()
  });
};

const getGroup = async (data: {slug: string; accessToken: () => string}) => {
  const authorization = () => data.accessToken();

  const response = await fetchJson(`chat/${data.slug}`, "", {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + authorization()
  });
  return response.data;
};

export { fetchData, loadingLevel, getAuthTokens, getProfile, getRefreshTokens, getGroup};
