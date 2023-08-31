'use client'
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookie from 'js-cookie'
import { z } from "zod";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
}

const userSchema = z.object({
  email: z.string().email({ message: "Endereço de e-mail inválido" }),
  name: z.string().min(3, { message: "Deve ter pelo menos 3 caracteres" }),
  avatar_url: z.string().url({ message: "Url inválido" }),
  password: z.string().min(6, { message: "Deve ter pelo menos 6 caracteres" }),
})

export function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<IFormInput>({
    resolver: zodResolver(userSchema),
  })

  async function onSubmit(data: IFormInput){
    try{
    const response = await api.post('/register', data);
    const { token }  = response.data;
    if(token){
      Cookie.set('token', token, { expires: 1 });
      router.refresh();
      router.push('/user');
    }
    }catch(e){console.log(e);}
  }

  return(
    <form className="flex flex-col text-main" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-title text-center font-bold">Cadastro de usuário</h1>
      <label htmlFor="name">Nome:</label>
      <input
      className="border rounded p-2 mb-2"
      type="text" id="name" {...register("name")}/>
      {errors.name?.message && <p className="text-sm font-bold text-danger">{errors.name.message}</p>}

      <label htmlFor="email">E-mail:</label>
      <input
      className="border rounded p-2 mb-2" id="email" {...register("email")}/>
      {errors.email?.message && <p className="text-sm font-bold text-danger">{errors.email.message}</p>}

      <label htmlFor="password">Senha:</label>
      <input
      className="border rounded p-2 mb-2"
      type="password" id="password" {...register("password")} autoComplete="off" />
      {errors.password?.message && <p className="text-sm font-bold text-danger">{errors.password.message}</p>}

      <label htmlFor="avatar_url">Avatar url:</label>
      <input
      className="border rounded p-2 mb-2"
      type="text" id="avatar_url" {...register("avatar_url")}/>
      {errors.avatar_url?.message && <p className="text-sm font-bold text-danger">{errors.avatar_url.message}</p>}

      <button type="submit" disabled={isSubmitting} className="border font-bold rounded w-[200px] px-2 py-3 m-auto mt-6">
        {isSubmitting && <span className="animate-spin mr-1"></span>}
        Salvar
      </button>
    </form>
  );
}