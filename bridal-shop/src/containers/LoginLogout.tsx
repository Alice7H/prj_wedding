import Image from "next/image";
import logo from  "../app/favicon.ico";

export function LoginLogout(){
  const hasUser = false;

  return (
    <>
      {
        hasUser
        ? <li><a className="hover:underline" href="/">Sair</a></li>
        : <li><a className="hover:underline" href="/login">Login</a></li>
      }
    </>
  )
}