import { Elysia, t } from "elysia";
import urls from "./cabanga_urls";
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'node-html-parser';

const authPlugin = new Elysia()
  .decorate("getAction", async () => {
    const nonce = uuidv4();
    const state = uuidv4();

    const authUrl = urls.auth + "?" + new URLSearchParams({
      "client_id": "cabanga-frontend",
      "response_mode": "fragment",
      "response_type": "code",
      "scope": "openid",
      "redirect_uri": "https://app.cabanga.be/",
      "nonce": nonce,
      "state": state
    })
    const authResponse = await fetch(authUrl, {
      headers: {
        "Connection": "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "*/*",
        "User-Agent": "Cabonga",
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
  
    const parsed = parse(await authResponse.text())
    const action = parsed.querySelector('form')?.attributes.action.toString()
    const authCookies = authResponse.headers.get("Set-Cookie")

    return { action, authCookies }
  })
  .decorate("getCode", async (action: string, body: {username: string; password: string}, authCookies: string) => {
    const loginResponse = await fetch(action!, {
      method: "POST",
      redirect: "manual",
      body: JSON.stringify({
        "username": body.username,
        "password": body.password,
        "credentialId": ""
      }),
      headers: {
        "Connection": "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "User-Agent": "Cabonga",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": authCookies!.toString()
      }
    })
    return loginResponse.headers.get('location')
  })
  .post('/token', async ({ body , getAction, getCode }) => {
    const { action, authCookies } = await getAction()
    if (!action || !authCookies) throw new Error()
    const code = await getCode(action!, body, authCookies!)
    if (!code) throw new Error()
    return {status: "ok", data: code}
  }, {
    body: t.Object({
      username: t.String({
        error: "Username is required"
      }),
      password: t.String({
        error: "Password is required"
      })
    }, {
      error: "Username and password are required"
    })
  })

const app = new Elysia()
  .onError(({ code, error }) => {
    switch (code) {
      case 'VALIDATION':
        return {status: "error", message: error.message}
      case 'UNKNOWN':
        return {status: "error", message: "Server Error"}
      default:
        return {status: "error", message: error.message}
    }
  })
  .group('/v1', app => app
    .use(authPlugin)
    .get('/', () => {
      return "Using v1"
    })
  )
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app
