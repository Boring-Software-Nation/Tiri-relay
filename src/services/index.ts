import { API_HOST, API_PASSWORD } from '../config'
import { Api } from './api'
import setAuthorizationToken from "./set-authorization-token";

export const limit = 10

console.log('CONFIG.API_HOST', API_HOST)

export const api = new Api({
  baseURL: `${API_HOST}`,
  securityWorker: token => token ? { headers: { authorization: `Basic ${token}` } } : {},
  secure: true,
})

setAuthorizationToken(API_PASSWORD)

export function pageToOffset (page: number = 1, localLimit = limit): {limit: number, offset: number} {
  const offset = (page - 1) * localLimit
  return { limit: localLimit, offset }
}


