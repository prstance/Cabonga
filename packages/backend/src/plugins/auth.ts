import { Elysia, t } from "elysia";
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'node-html-parser';
import urls from "@/cabanga_urls";
import { InvalidRefreshTokenError, LoginError } from "@/errors";
import { authTokensType, decodedAccessTokenType } from "@/types";
import jwt from "@elysiajs/jwt";
import jwt_decode from "jwt-decode";



const authPlugin = new Elysia()
  .use(
    jwt({
        name: 'jwt',
        secret: Bun.env.JWT_SECRET!,
        exp: '7d'
    })
  )
  .group('/token', app => app
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
      const details = {
        "username": body.username,
        "password": body.password,
        "credentialId": null
      }
      let formBody: string[] = []
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[(property as keyof typeof details)]!);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      const formBodyString = formBody.join("&");

      const loginResponse = await fetch(action!, {
        method: "POST",
        redirect: "manual",
        body: formBodyString,
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
      return loginResponse.headers.get('location')?.split('code=')[1]
    })
    .decorate("getToken", async (code: string) => {
      const details = {
        "code": code,
        "grant_type": "authorization_code",
        "client_id": "cabanga-frontend",
        "redirect_uri": "https://app.cabanga.be/",
      }

      let formBody: string[] = []
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[(property as keyof typeof details)]!);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      const formBodyString = formBody.join("&");

      const tokenResponse = await fetch(urls.token,
        {
          method: "POST",
          body: formBodyString,
          headers: {
            "Connection": "keep-alive",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept": "*/*",
            "User-Agent": "Cabonga",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
      
      return tokenResponse.json()
    })
    .post("/", async ({ body , getAction, getCode, getToken, jwt }) => {
      const { action, authCookies } = await getAction()
      if (!action || !authCookies) throw new Error() 
      const code = await getCode(action!, body, authCookies!)
      if (!code) throw new LoginError()
      const tokens = await getToken(code)
      if (!tokens) throw new Error()
      const data: authTokensType = {
        access: tokens['access_token'],
        refresh: tokens['refresh_token'],
    } 
      // Generate our token
      const decodedJWT: decodedAccessTokenType = jwt_decode(data.access);
      const engineAccessToken = await jwt.sign({
        username: decodedJWT.preferred_username
      })
      data.engine = engineAccessToken;
      return {status: "ok", data: data}
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
    .post("/refresh", async ({ body, jwt }) => {
      const refreshToken = body.refresh

      const details = {
        "refresh_token": refreshToken,
        "grant_type":'refresh_token',
        "client_id": "cabanga-frontend",
        "redirect_uri": "https://app.cabanga.be/",
      }
      let formBody: string[] = []
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[(property as keyof typeof details)]!);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      const formBodyString = formBody.join("&");
      const response = await fetch(urls.token, {
        method: "POST",
        body: formBodyString,
        headers: {
          "Connection": "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept": "*/*",
          "User-Agent": "Cabonga",
          "Content-Type": "application/x-www-form-urlencoded",
      }
      })
      const tokens = await response.json()
      if (tokens["error"] !== undefined) throw new InvalidRefreshTokenError()
      const data: authTokensType = {
        access: tokens['access_token'],
        refresh: tokens['refresh_token'],
    }

      // Generate our token
      const decodedJWT: decodedAccessTokenType = jwt_decode(data.access);
      const engineAccessToken = await jwt.sign({
        username: decodedJWT.preferred_username
      })
      return {status: "ok", data: {
        nativeTokens: data,
        engineToken: engineAccessToken
      }}
    }, {
      body: t.Object({
        refresh: t.String({
          error: "Refresh token is required"
        })
      },
      {
        error: "Refresh token is required"
      })
    })
  )

export default authPlugin;