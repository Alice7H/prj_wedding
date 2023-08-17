import decode from 'jwt-decode'
import Cookies from 'js-cookie'

interface User {
  sub: string
  name: string
  avatarUrl: string
}
export function getUser(): User {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('unauthenticated')
  }
  const user: User = decode(token)
  return user
}