import { Elysia, t } from "elysia";
import cors from "@elysiajs/cors";
import { PrismaClient } from '@prisma/client'
import { NotWhitelistedError, InvalidRefreshTokenError } from "./errors";
import authPlugin from "./plugins/auth";
import dataPlugin from "./plugins/data";

const db = new PrismaClient()
const configID = 1

const app = new Elysia()
  .use(cors())
  .group('/v1', app => app
    .addError({
      WhitelistError: NotWhitelistedError,
      RefreshTokenError: InvalidRefreshTokenError
    })
    .onError(({ code, error, set }) => {
      console.log(error.message)
      switch (code) {
        case 'WhitelistError':
          set.status = 403
          return {status: "error", message: error.message}
        case 'RefreshTokenError':
          set.status = 400
          return {status: "error", message: error.message}
        case 'UNKNOWN':
          return {status: "error", message: "SERVER_ERROR"}
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
      // Get the configuration settings for the application
      const cfg = await getConfig()

      // If there is no configuration, throw an error
      if (!cfg) throw new Error()

      // Check if the request path is in the whitelist and relates to token endpoints
      if (cfg.whitelist && (path === "/v1/token/" || path === "/v1/token")) {
        // Extract the username from the request body
        const user = await isUserWhitelisted((body as {username: string}).username)

        // If the user is not whitelisted, throw a NotWhitelistedError
        if (!user) throw new NotWhitelistedError("Non-whitelisted user")
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
