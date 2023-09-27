import urls from "@/cabanga_urls";
import { profileType } from "@/types";
import Elysia, { t } from "elysia";

const dataPlugin = new Elysia()
  .get("/profile", async ({ headers }) => {
    // const bearerToken = headers.authorization
    // const response = await fetch(urls.profile, {
    //   method: "GET",
    //   headers: {
    //     "Authorization": bearerToken
    //   }
    // })

    // const profile: profileType = await response.json()
    return {status: "ok", data: {
      "id": 284665,
      "firstName": "Romain",
      "lastName": "Mathieu",
      "schoolId": "INDTH",
      "schoolName": "Institut Notre-Dame de Thuin",
      "type": "STUDENT",
      "staffMember": false,
      "parent": false,
      "student": true
  }} 
  }, {
    headers: t.Object({
      authorization: t.String({
        error: "Invalid access token"
      })
    }, {
      error: "Invalid access token"
    })
  })
  .get("/diary", ({ query }) => {
    const { school, student, from, to } = query;
    return {status: "ok", data: [
      {
          "attributionId": 22643901,
          "date": "2023-09-28",
          "hour": "08:15",
          "lessonName": "Français",
          "homework": "Interro sur le vocabulaire du temps (exc. I à V).",
          "homeworkDone": false,
          "id": 23839515
      },
      {
          "attributionId": 22643901,
          "date": "2023-09-28",
          "hour": "09:05",
          "lessonName": "Français",
          "lessonSubject": "Préparation de la journée au FIFF.",
          "homeworkDone": false,
          "id": 23930417
      },
      {
          "attributionId": 22644051,
          "date": "2023-09-28",
          "hour": "09:55",
          "lessonName": "Langue moderne I : Néerlandais",
          "lessonSubject": "Corr prépa\nThematische woordenschat: voc/Time's up + QU/réponses\nKlassepraat CA QU.3 et 5",
          "homework": "p.165 CA (piste 71 sur Classroom)",
          "homeworkDone": false,
          "id": 25613597
      },
      {
          "attributionId": 22650201,
          "date": "2023-09-28",
          "hour": "11:05",
          "lessonName": "Mathématique",
          "homework": "Problème 1 le 1) page 27",
          "homeworkDone": false,
          "id": 25599077
      },
      {
          "attributionId": 22644751,
          "date": "2023-09-28",
          "hour": "11:55",
          "lessonName": "Formation historique",
          "lessonSubject": "Ch. I : Oser penser au XVIIIe siècle ? D. Quels outils de diffusion des idéaux des Lumières en Europe au XVIIIe siècle ?",
          "homeworkDone": false,
          "id": 25298411
      },
      {
          "attributionId": 22644151,
          "date": "2023-09-28",
          "hour": "14:25",
          "lessonName": "Langue moderne II : Anglais",
          "lessonSubject": "One minute talk prep\nUnit 1 Introduction \nCL/CA Around the world + Code",
          "homeworkDone": false,
          "id": 23596025
      },
      {
          "attributionId": 22932285,
          "date": "2023-09-28",
          "hour": "15:15",
          "lessonName": "Biologie",
          "lessonSubject": "Test UAA5 - L'organisme humain se protège, chapitre 2 \"Système immunitaire, vaccins et greffes\", jusque la page 20 incluse",
          "homework": "Test UAA5 - L'organisme humain se protège, chapitre 2 \"Système immunitaire, vaccins et greffes\", jusque la page 20 incluse",
          "homeworkDone": false,
          "id": 23866131
      }
  ]}
  })
  .get("/evaluations", ({ query }) => {
    const { school, student, year } = query;
    return {status: "ok", data: [
      {
          "evaluationId": 25581966,
          "studentId": 284665,
          "schoolId": "INDTH",
          "year": "2023",
          "subject": "Physique",
          "code": "INT 1",
          "attributionId": 22651351,
          "periodCode": "Form",
          "title": "MRU",
          "date": "2023-09-25",
          "formative": true,
          "visible": true,
          "comment": null,
          "studentEvaluationCompetencesScoresView": [
              {
                  "evaluationId": 25581966,
                  "competenceId": 25580720,
                  "studentId": 284665,
                  "code": "UAA 5",
                  "name": "Forces et mouvements",
                  "score": "13.5",
                  "maximumScore": 20.0
              }
          ],
          "maximumScore": 20.0,
          "score": 13.5
      },
      {
          "evaluationId": 23919977,
          "studentId": 284665,
          "schoolId": "INDTH",
          "year": "2023",
          "subject": "Langue moderne II : Anglais",
          "code": "Code1",
          "attributionId": 22644151,
          "periodCode": "Form",
          "title": "Revision unit",
          "date": "2023-09-20",
          "formative": true,
          "visible": true,
          "comment": null,
          "studentEvaluationCompetencesScoresView": [
              {
                  "evaluationId": 23919977,
                  "competenceId": 23906252,
                  "studentId": 284665,
                  "code": "Code",
                  "name": "Vocabulaire et grammaire",
                  "score": "19",
                  "maximumScore": 30.0
              }
          ],
          "maximumScore": 30.0,
          "score": 19.0
      },
      {
          "evaluationId": 23865754,
          "studentId": 284665,
          "schoolId": "INDTH",
          "year": "2023",
          "subject": "Biologie",
          "code": "Test 1",
          "attributionId": 22932285,
          "periodCode": "Form",
          "title": "UAA5 - L'organisme humain se protège - chapitre 1 \"microorganismes pathogènes et non pathogènes\"",
          "date": "2023-09-20",
          "formative": true,
          "visible": true,
          "comment": null,
          "studentEvaluationCompetencesScoresView": [
              {
                  "evaluationId": 23865754,
                  "competenceId": 23848016,
                  "studentId": 284665,
                  "code": "M1",
                  "name": "UAA5",
                  "score": "10",
                  "maximumScore": 15.0
              }
          ],
          "maximumScore": 15.0,
          "score": 10.0
      },
      {
          "evaluationId": 25481212,
          "studentId": 284665,
          "schoolId": "INDTH",
          "year": "2023",
          "subject": "Langue moderne I : Néerlandais",
          "code": "Code 1",
          "attributionId": 22644051,
          "periodCode": "Form",
          "title": "Conjugaison: les temps simples",
          "date": "2023-09-19",
          "formative": true,
          "visible": true,
          "comment": null,
          "studentEvaluationCompetencesScoresView": [
              {
                  "evaluationId": 25481212,
                  "competenceId": 23684720,
                  "studentId": 284665,
                  "code": "Code",
                  "name": "Grammaire et vocabulaire",
                  "score": "7",
                  "maximumScore": 12.0
              }
          ],
          "maximumScore": 12.0,
          "score": 7.0
      },
      {
          "evaluationId": 23761512,
          "studentId": 284665,
          "schoolId": "INDTH",
          "year": "2023",
          "subject": "Mathématique",
          "code": "cn1",
          "attributionId": 22650201,
          "periodCode": "Form",
          "title": "Notions trigo",
          "date": "2023-09-12",
          "formative": true,
          "visible": true,
          "comment": null,
          "studentEvaluationCompetencesScoresView": [
              {
                  "evaluationId": 23761512,
                  "competenceId": 23750970,
                  "studentId": 284665,
                  "code": "UAA1",
                  "name": "Fonctions trigonométriques",
                  "score": "16.5",
                  "maximumScore": 20.0
              }
          ],
          "maximumScore": 20.0,
          "score": 16.5
      }
  ]}
  })

export default dataPlugin;