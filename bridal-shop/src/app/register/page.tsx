'use client'
import Image from "next/image";
import registerImage from "../../../public/dresses/register_dresses.svg";
import { RegisterForm } from "@/containers/RegisterForm";

export default function Register() {
  return(
    <main className="flex justify-center items-center flex-col-reverse sm:flex-row mt-8">
      <div className="flex items-center justify-center sm:justify-end m-8 sm:mt-0 w-[90%] sm:w-[400px]">
       <RegisterForm />
      </div>

      <div className="flex justify-center items-center px-8">
        <Image src={registerImage} alt="vestidos de noiva" className="w-[80%] sm:w-[350px]" />
      </div>
    </main>
  )
}