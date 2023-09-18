import { LAGO_API_HOST, LAGO_API_KEY } from '../config'
import { Api } from './api'
import setAuthorizationToken from "./set-authorization-token";


console.log('CONFIG.LAGO_API_HOST', LAGO_API_HOST)

export const api = new Api({
  baseURL: `${LAGO_API_HOST}`,
  securityWorker: token => token ? { headers: { authorization: `Bearer ${token}` } } : {},
})

setAuthorizationToken(LAGO_API_KEY)



