import { Elysia, t } from "elysia";
import cors from "@elysiajs/cors";
import { PrismaClient } from '@prisma/client'
import { NotWhitelistedError, InvalidRefreshTokenError, LoginError } from "./errors";
import authPlugin from "./plugins/auth";
import dataPlugin from "./plugins/data";

const db = new PrismaClient()
const configID = 1

const app = new Elysia()
  .use(cors())
  .group('/v1', app => app
    .addError({
      WhitelistError: NotWhitelistedError,
      RefreshTokenError: InvalidRefreshTokenError,
      LoginError: LoginError
    })
    .onError(({ code, error, set }) => {
      switch (code) {
        case 'WhitelistError':
          set.status = 403
          return {status: "error", message: error.message}
        case 'RefreshTokenError':
          set.status = 400
          return {status: "error", message: error.message}
        case 'LoginError':
          set.status = 401
          return {status: "error", message: error.message}
        case 'UNKNOWN':
          return {status: "error", message: error.message}
        default:
          return {status: "error", message: error.message}
      }
    })
    .decorate("isUserWhitelisted", async (username: string) => {
      return  db.user.findUnique({
        where: {
          username: String(username),
          whitelisted: true
        }
      })
    })
    .decorate("getConfig", async () => {
      return db.config.findUnique({
        where: {
          id: configID
        }
      })
    })
    .onBeforeHandle(async ({path, body, isUserWhitelisted, getConfig}) => {
      const cfg = await getConfig()
      if (!cfg) throw new Error()
      if (cfg.whitelist && (path === "/v1/token/" || path === "/v1/token")) {
        const user = await isUserWhitelisted((body as {username: string}).username)
        if (!user) throw new NotWhitelistedError()
      }
    })
    .use(authPlugin)
    .use(dataPlugin)
    .get('/', () => {
      return "Using v1"
    })
  )
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app
