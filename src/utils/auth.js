import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setTokenDuration(duration) {
  return Cookies.set('TokenDuration', duration)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
