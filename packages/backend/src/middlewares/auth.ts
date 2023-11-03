import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";

const db = new PrismaClient();

const isAuthenticated = new Elysia()
  .derive(async ({ request: { headers }, set, jwt }) => {
    const accessToken = headers.get("authorization")?.slice(7);
    if (!accessToken) {
      set.status = 401;
      throw new Error();
    }
    const { username } = await jwt.verify(accessToken);
    if (!username) {
      set.status = 401;
      throw new Error();
    }

    const user = await db.user.findUnique({
      where: {
        username
      }
    });
    if (!user) {
      set.status = 401;
      throw new Error();
    }
    return {
      user
    };
  });

export default isAuthenticated;
