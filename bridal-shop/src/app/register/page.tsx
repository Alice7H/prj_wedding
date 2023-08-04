'use client'
import Image from "next/image";
import registerImage from "../../../public/dresses/register_dresses.svg";

export default function Register() {
  return(
    <main className="flex justify-center items-center flex-col-reverse sm:flex-row mt-8">
      <div className="flex items-center justify-center sm:justify-end m-8 sm:mt-0 w-[90%] sm:w-[400px]">
        <form className="flex flex-col text-main">
          <h1 className="text-title text-center font-bold">Cadastro de usuário</h1>
          <label htmlFor="name">Nome:</label>
          <input
          className="border rounded p-2 mb-2"
          type="text" id="name" name="name"/>

          <label htmlFor="email">E-mail:</label>
          <input
          className="border rounded p-2 mb-2"
          type="email" id="email" name="email"/>

          <label htmlFor="password">Senha:</label>
          <input
          className="border rounded p-2 mb-2"
          type="password" id="password" name="password"/>

          <label htmlFor="avatar_url">Avatar url:</label>
          <input
          className="border rounded p-2 mb-2"
          type="text" id="avatar_url" name="avatar_url"/>

          <button type="submit" className="border font-bold rounded w-[200px] px-2 py-3 m-auto mt-6">
            Salvar
          </button>
        </form>
      </div>

      <div className="flex justify-center items-center px-8">
        <Image src={registerImage} alt="vestidos de noiva" className="w-[80%] sm:w-[350px]" />
      </div>
    </main>
  )
}