'use client'
import Image from "next/image";
import loginImage from "../../../public/dresses/login_dresses.svg";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try{
      const formData = new FormData(event.currentTarget)
      if(!formData.get('email')){
        alert('Informe o e-mail');
        return;
      }
      if(!formData.get('password')){
        alert('Informe a senha');
        return;
      }
      const response = await api.post('/login', {
        email: formData.get('email'),
        password: formData.get('password'),
      })
      const { token }  = response.data;
      if(token){
        Cookie.set('token', token, { expires: 1 });
        router.refresh();
        router.push('/user');
      }
    }catch(e){ console.log(e); }
  }

  return (
    <main className="h-[70vh] flex justify-center items-center flex-col sm:flex-row mt-8">
      <Image src={loginImage} alt="acessório e roupa de casamento" className="px-8 w-[90%] sm:w-[400px]"/>
      <div className="flex items-center justify-center px-12 mt-8 sm:mt-0">
        <form className="flex flex-col text-main" onSubmit={handleSubmit}>
          <h1 className="text-title text-center font-bold">Login</h1>
          <label htmlFor="email">E-mail:</label>
          <input
          className="border rounded p-2 mb-2"
          type="email" id="email" name="email" autoComplete="false"/>

          <label htmlFor="password">Senha:</label>
          <input
          className="border rounded p-2 mb-2"
          type="password" id="password" name="password" autoComplete="false"/>

          <button type="submit" className="font-bold border rounded w-[200px] px-2 py-3 m-auto mt-6">
            Entrar
          </button>
        </form>
      </div>

    </main>
  )
}