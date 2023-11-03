import { authTokensType } from "@/types";
import { createSignal } from "solid-js";
import { setAuthStore } from "./auth";
import { formatDate } from "@/utils";

const base_url = "http://localhost:8000/v1/";

const createUrl = (endpoint: string) => `${base_url}${endpoint}/`;

const fetchJson = async (endpoint: string, endwith: string = "", headers: HeadersInit = {}) => {
  setLoadingLevel(loadingLevel() + 1);
  const response = await fetch(createUrl(endpoint) + endwith, {headers: headers});
  if (!response.ok) return Promise.reject(new Error("Error"));
  return response.json();
};

const postData = async (endpoint: string, endwith: string = "", body: object, headers: HeadersInit = {}) => {
  return (await fetch(createUrl(endpoint) + endwith, {method: "POST", body: JSON.stringify(body), headers: headers})).json();
};

const [loadingLevel, setLoadingLevel] = createSignal(0);

const fetchData = async (accessToken: string, engineAccessToken: string, school: string, student: string) => {
  const today = new Date();
  const diaryDate = formatDate(today);
  const authorization = () => accessToken;
  const engineToken = () => engineAccessToken;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + authorization()
  };

  setAuthStore({diary: (await fetchJson("diary", `?school=${school}&student=${student}&from=${diaryDate}&to=${diaryDate}`, headers)).data});
  setAuthStore({evaluations: (await fetchJson("evaluations", `?school=${school}&student=${student}&year=${new Date().getFullYear()}`, headers)).data});
  setAuthStore({agenda: (await fetchJson("agenda", `?school=${school}&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`, headers)).data});
  setAuthStore({groups: (await fetchJson("groups", "", {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + engineToken()
  })).data});
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

const getGroup = async (data: {id: number; engineToken: () => string}) => {
  const authorization = () => data.engineToken();

  const response = await fetchJson(`groups/${data.id}`, "", {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + authorization()
  });
  return response.data;
};

export { fetchData, loadingLevel, getAuthTokens, getProfile, getRefreshTokens, getGroup};
