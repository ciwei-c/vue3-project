import Cookies from "js-cookie";

const RefreshKey = "Authorization-Refresh";
const RefreshTokenKey = "Authorization";
const AccessTokenKey = "Authorization-Token";
const CurrentUserKey = "Authorization-User";
const authTimeKey = "Auth-Time";
const requestTimeKey = "Request-Time";
const expireTimeKey = "Expire-Time";

const options = {
  path: window.location.pathname,
};
export function getToken() {
  return {
    Authorization: Cookies.get(RefreshTokenKey),
    "Authorization-Token": Cookies.get(AccessTokenKey),
  };
}

export function setAuthTime(authTime) {
  Cookies.set(authTimeKey, authTime, options);
}

export function removeUser() {
  localStorage.removeItem(CurrentUserKey);
}

export function isLogined() {
  return !!Cookies.get(AccessTokenKey);
}

export function setToken(refreshToken, accessToken) {
  Cookies.set(RefreshTokenKey, refreshToken, options);
  Cookies.set(AccessTokenKey, accessToken, options);
  setAuthTime(new window.CompatibleDate().getTime());
}

export function removeTime() {
  Cookies.remove(requestTimeKey, options);
  Cookies.remove(authTimeKey, options);
  Cookies.remove(expireTimeKey, options);
}
export function removeToken() {
  Cookies.remove(RefreshTokenKey, options);
  Cookies.remove(AccessTokenKey, options);
  Cookies.remove(RefreshKey, options);
  removeTime();
  removeUser();
}

export function getRefreshToken() {
  return Cookies.get(RefreshKey);
}

export function setRefreshToken(refresh) {
  Cookies.set(RefreshKey, refresh, options);
}

export function getUser() {
  return localStorage.getItem(CurrentUserKey);
}

export function setUser(CurrentUser) {
  localStorage.setItem(CurrentUserKey, JSON.stringify(CurrentUser));
}

export function getAuthTime() {
  return Cookies.get(authTimeKey);
}

export function setRequestTime(requstTime) {
  Cookies.set(requestTimeKey, requstTime, options);
}

export function getRequestTime() {
  return Cookies.get(requestTimeKey);
}

export function setExpireTime(expires) {
  Cookies.set(expireTimeKey, expires, options);
}

export function getExpireTime() {
  return Cookies.get(expireTimeKey);
}
