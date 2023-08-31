'use client'
import { api } from "@/lib/api";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IFormInput {
  email: string;
  password: string
}

const loginSchema = z.object({
  email: z.string().email({ message: "Endereço de e-mail inválido" }),
  password: z.string().min(6, { message: "Deve ter pelo menos 6 caracteres" }),
})

export function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<IFormInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: IFormInput) {
    try{
      const response = await api.post('/login', data)
      const { token }  = response.data;
      if(token){
        Cookie.set('token', token, { expires: 1 });
        router.refresh();
        router.push('/user');
      }
    }catch(e){ console.log(e); }
  }

  return(
    <form autoComplete="off" className="flex flex-col text-main" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-title text-center font-bold">Login</h1>
      <label htmlFor="email">E-mail:</label>
      <input
      className="border rounded p-2 mb-2"
      type="email" id="email" {...register("email")}/>
      {errors.email?.message && <p className="text-sm font-bold text-danger">{errors.email.message}</p>}

      <label htmlFor="password">Senha:</label>
      <input
      className="border rounded p-2 mb-2"
      type="password" id="password" autoComplete="off" {...register("password")}/>
           {errors.password?.message && <p className="text-sm font-bold text-danger">{errors.password.message}</p>}


      <button type="submit"  disabled={isSubmitting} className="font-bold border rounded w-[200px] px-2 py-3 m-auto mt-6">
        {isSubmitting && <span className="animate-spin mr-1"></span>}
        Entrar
      </button>
    </form>
  )
}