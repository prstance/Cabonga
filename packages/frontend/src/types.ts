type authTokensType = {
  access: string;
  refresh: string;
  engine: string;
}

type decodedJwtType = {
  "allowed-origins": string[];
  aud: string[];
  auth_time: number;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nonce: string;
  preferred_username: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
    "cabanga-api": {
      roles: string[];
    };
  };
  scope: string;
  session_state: string;
  sid: string;
  sub: string;
  typ: string;
}

type userType = {
  avatar: string;
  firstName: string;
  id: number;
  lastName: string;
  parent: boolean;
  schoolId: string;
  schoolName: string;
  staffMember: false;
  student: boolean;
  type: string;
}

type diaryType = {
  attributionId: number;
  date: Date;
  hour: string;
  lessonName: string;
  lessonSubject: string;
  homeworkDone: boolean;
  id: number;
}

type evaluationSkillType = {
  evaluationId: number;
  competenceId: number;
  studentId: number;
  code: string;
  name: string;
  score: string;
  maximumScore: number;
}

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
  date: Date;
  formative: boolean;
  visible: boolean;
  comment: string | null;
  studentEvaluationCompetencesScoresView: evaluationSkillType[];
  maximumScore: number;
  score: number;
}

type agendaDayType = {
  date: Date;
  event: null | [];
  today: boolean;
  weekday: boolean;
}

type groupType = {
  name: string;
  id: number;
  image: string;
}

type chatGroupType = {
  group: groupType;
  messages: [];
}

type rawMessageType = {
  username: string;
  content: string;
  email: string;
}

type messageType = {
  text: string;
  author: string;
  you: boolean;
}

interface authStoreTypes {
  isAuthenticated: boolean;
  authTokens: null | authTokensType;
  decodedJWT: null | decodedJwtType;
  profile: null | userType;
  diary: null | diaryType[];
  evaluations: null | evaluationType[];
  agenda: null | agendaDayType[][];
  groups: null | groupType[];
  group: null;
}

export type { authTokensType, userType, diaryType, evaluationType, authStoreTypes, decodedJwtType, agendaDayType, groupType, chatGroupType, rawMessageType, messageType };
