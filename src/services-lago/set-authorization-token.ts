import { api as apiLago } from './index'

export default function ( apiKey?: string | null ): string | void {
  if (apiKey === null) {
    apiLago.setSecurityData(null)
    return
  } else if (apiKey !== undefined) {
    apiLago.setSecurityData(apiKey)
    return apiKey
  }
}
