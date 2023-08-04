'use client'
import Image from "next/image";
import loginImage from "../../../public/dresses/login_dresses.svg";

export default function Login() {
  return (
    <main className="flex justify-center items-center flex-col sm:flex-row mt-8">
      <Image src={loginImage} alt="acessório e roupa de casamento" className="px-8 w-[90%] sm:w-[400px]"/>
      <div className="flex items-center justify-center px-12 mt-8 sm:mt-0">
        <form className="flex flex-col text-main">
          <h1 className="text-title text-center font-bold">Login</h1>
          <label htmlFor="email">E-mail:</label>
          <input
          className="border rounded p-2 mb-2"
          type="email" id="email" name="email"/>

          <label htmlFor="password">Senha:</label>
          <input
          className="border rounded p-2 mb-2"
          type="password" id="password" name="password"/>

          <button type="submit" className="font-bold border rounded w-[200px] px-2 py-3 m-auto mt-6">
            Entrar
          </button>
        </form>
      </div>

    </main>
  )
}