import isAuthenticated from "@/middlewares/auth";
import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import { agendaDayType, profileType } from "@/types"
import { format, isToday, isSunday, isMonday, startOfWeek, addDays, subDays, endOfWeek } from 'date-fns';
import urls from "@/cabanga_urls";

const db = new PrismaClient();


const dataPlugin = new Elysia()
  .get("/profile", async ({ headers }) => {
    const bearerToken = headers.authorization
    const response = await fetch(urls.profile, {
      headers: {
        "authorization": bearerToken
      }
    })
    const profile: profileType = (await response.json())[0]
    return {status: "ok", data: profile} 
  }, {
    headers: t.Object({
      authorization: t.String({
        error: "Invalid access token"
      })
    }, {
      error: "Invalid access token"
    })
  })
  .get("/diary", async ({ query, headers }) => {
    const { school, student, from, to } = query;
    const bearerToken = headers.authorization
    const diary: profileType = await (await fetch(urls.diary(school!, student!, from!, to!), {
      headers: {
        Authorization: bearerToken
      }
    })).json()

    return {status: "ok", data: diary}
  }, {
    headers: t.Object({
      authorization: t.String({
        error: "Invalid access token"
      })
    }, {
      error: "Invalid access token"
    })
  })
  .get("/evaluations", async ({ query, headers }) => {
    const { school, student, year } = query;
    const bearerToken = headers.authorization
    const evaluations: profileType = await (await fetch(urls.evaluations(school!, student!, year!), {
      headers: {
        Authorization: bearerToken
      }
    })).json()
    return {status: "ok", data: evaluations}
  }, 
  {
    headers: t.Object({
      authorization: t.String({
        error: "Invalid access token"
      })
    }, {
      error: "Invalid access token"
    })
  })
  .decorate("generateCalendar", (year: number, month: number) => {
    const calendar: agendaDayType[][] = [];
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    let firstMonday = firstDayOfMonth;
    while (!isMonday(firstMonday)) {
      firstMonday = addDays(firstMonday, 1);
    }
    const startDate = startOfWeek(subDays(firstMonday, 1), { weekStartsOn: 1 });
    const endDate = endOfWeek(lastDayOfMonth);
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const calendarWeek: agendaDayType[] = [];
      for (let i = 0; i < 7; i++) {
        const dateStr = format(currentDate, 'yyyy-MM-dd');
        const isInMonth = currentDate.getMonth() === month - 1;
        calendarWeek.push({
          date: dateStr,
          event: isInMonth ? [] : null,
          today: isToday(currentDate),
          weekday: i >= 5,
        });
        currentDate = addDays(currentDate, 1);
      }
      calendar.push(calendarWeek);
    }
    return calendar;
  })
  .get("/agenda", ({ query, generateCalendar }) => {
    const { school, year, month } = query;
    const calendar = generateCalendar(parseInt(year), parseInt(month))
    if (!calendar) throw new Error()
    return {
      status: "ok",
      data: calendar
    }
  }, {
    query: t.Object({
      school: t.String(),
      year: t.String(),
      month: t.String()
    })
  })
  .ws("/chat/:id", {
    open(ws) {
      console.log('open')
    },
    message(ws, message) {
      ws.send(message)
    },
  })
  .use(isAuthenticated)
  .get("/groups", async ({ user, set }) => {
    if (!user) {
      set.status = 401;
      throw new Error();
    }

    const groups = await db.group.findMany({
      where: {
        members: {
          contains: user.username
        }
      }
    })

    return {status: "ok", data: groups}
  })
  .get("/groups/:id", async ({ user, params }) => {
    const { id } = params;
    const group = await db.group.findUnique({
      where: {
        id: parseInt(id)
      }
    })
    if (!group) throw new Error();
    const messages = await db.message.findMany({
      where: {
        email: user.username
      }
    })
    return {
      status: "ok",
      data: {
        group: group,
        messages
      }
    }
  })

export default dataPlugin;