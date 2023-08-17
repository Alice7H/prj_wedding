import { cookies } from 'next/headers'

export function LoginLogout(){
  const token = cookies().get('token')?.value

  return (
    <>
      {
        token
        ? <li><a className="hover:underline" href="/api/auth/logout">Sair</a></li>
        : <li><a className="hover:underline" href="/login">Login</a></li>
      }
    </>
  )
}