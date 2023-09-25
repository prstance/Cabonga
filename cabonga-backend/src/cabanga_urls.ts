const baseUrls = {
  API_BASE_URL: "https://app.cabanga.be/api/",
  LOGIN_BASE_URL: "https://login.cabanga.be/auth/realms/cabanga/protocol/openid-connect/"
}

const urls = {
  auth: baseUrls.LOGIN_BASE_URL + "auth",
  token: baseUrls.LOGIN_BASE_URL + "token",
  profile: baseUrls.API_BASE_URL + "profiles"
}

export default urls