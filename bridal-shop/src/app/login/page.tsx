'use client'
import Image from "next/image";
import loginImage from "../../../public/dresses/login_dresses.svg";
import { LoginForm } from "@/containers/LoginForm";

export default function Login() {

  return (
    <main className="h-[70vh] flex justify-center items-center flex-col sm:flex-row mt-8">
      <Image src={loginImage} alt="acessório e roupa de casamento" className="px-8 w-[90%] sm:w-[400px]"/>
      <div className="flex items-center justify-center px-12 mt-8 sm:mt-0">
        <LoginForm />
      </div>
    </main>
  )
}