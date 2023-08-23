import { api } from './index'

export default function ( password?: string | null ): string | void {
  if (password === null) {
    api.setSecurityData(null)
    return
  } else if (password !== undefined) {
    const token = btoa(`:${password}`)
    api.setSecurityData(token)
    return token
  }
}
