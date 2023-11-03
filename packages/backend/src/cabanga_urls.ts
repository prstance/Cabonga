const baseUrls = {
  API_BASE_URL: "https://app.cabanga.be/api/",
  LOGIN_BASE_URL: "https://login.cabanga.be/auth/realms/cabanga/protocol/openid-connect/"
}


const urls = {
  auth: baseUrls.LOGIN_BASE_URL + "auth",
  token: baseUrls.LOGIN_BASE_URL + "token",
  profile: baseUrls.API_BASE_URL + "profiles",
  diary: (schoolId: string, studentId: string, from: string, to: string) => `${baseUrls.API_BASE_URL}schools/${schoolId}/students/${studentId}/diary?from=${from}&to=${to}`,
  evaluations: (schoolId: string, studentId: string, year: string) => `${baseUrls.API_BASE_URL}schools/${schoolId}/students/${studentId}/evaluations?year=${year}`
}

export default urls