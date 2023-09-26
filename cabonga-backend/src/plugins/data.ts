import urls from "@/cabanga_urls";
import { profileType } from "@/types";
import Elysia, { t } from "elysia";

const dataPlugin = new Elysia()
  .get("/profile", async ({ headers }) => {
    const bearerToken = headers.authorization
    const response = await fetch(urls.profile, {
      method: "GET",
      headers: {
        "Authorization": bearerToken
      }
    })

    const profile: profileType = await response.json()
    return profile
  }, {
    headers: t.Object({
      authorization: t.String({
        error: "Invalid access token"
      })
    }, {
      error: "Invalid access token"
    })
  })

export default dataPlugin;