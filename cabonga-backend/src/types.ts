type authTokensType = {
  access: string;
  refresh: string;
}

type decodedAccessTokenType = {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  "allowed-origins": string[];
  realm_access: {
    roles: string[];
  };
  ressources_access: {
    account: {
      roles: string[]
    };
    "cabanga-api": {
      roles: string[]
    }
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  preferred_username: string;
  email: string;
}

type profileType = {
  id: number;
  firstName: string;
  lastName: string;
  schoolId: string;
  schoolName: string;
  type: string;
  staffMember: boolean;
  parent: boolean;
  student: boolean
}

type schoolType = {
  id: string;
  name: string;
  address: {
    city: string;
    street: string;
    houseNumber: string;
    postalCode: number;
  };
  degrees: {
    name: string;
    description: string;
  }[];
  sections: {
    degreeName: string;
    name: string;
    description: string;
  }[];
  classes: {
    id: number;
    sectionName: string;
    name: string;
    description: string;
    active: boolean;
    fictive: boolean;
  }[];
  activeSchoolYear: number;
  itSchoolLink?: string;
  logoLink: string;
  googleIntegration: boolean;
  microsoftIntegration: boolean
}

type agendaItemType = {}
type agendaType = agendaItemType[]

type evaluationType = {
  evaluationId: number;
  studentId: number;
  schoolId: string;
  year: string;
  subject: string;
  code: string;
  attributionId: number;
  periodCode: string;
  title: string;
  date: string;
  formative: boolean;
  visible: boolean;
  comment: null | undefined;
  studentEvaluationCompetencesScoresView: {
    evaluationId: number;
    competenceId: number;
    studentId: number;
    code: string;
    name: string;
    score: string;
    maximumScore: number;
  }[]
  maximumScore: number;
  score: number
}
type evaluationsType = evaluationType[]

type lessonType = {
  attributionId: number;
  year: string;
  lessonName: string;
  lessonHours: number;
  teachers: {
    teacherId: number;
    teacherFirstName: string;
    teacherLastName: string;
    teacherEmail: string;
  }[]
}
type lessonsType = lessonType[];

type diaryItemType = {
  attributionId: number;
  date: string;
  homework: string;
  homeworkDone: boolean;
  hour: string;
  id: number;
  lessonName: string;
  lessonSubject: string;
}
type diaryType = diaryItemType[];

export type { authTokensType, profileType, schoolType, agendaType, agendaItemType, evaluationType, evaluationsType, lessonType, lessonsType, diaryItemType, diaryType, decodedAccessTokenType }