import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Address } from "@/types/Address";
import { searchAddress } from "@/lib/correiosBr";

const cepSchema = z.object({
  cep: z.string().min(8, { message: "Deve ter 8 caracteres" })
  .max(8, { message: "Deve ter 8 caracteres"})
})

interface IProps {
  setAddress: Dispatch<SetStateAction<Address>>
}

export function AddressByCep ({setAddress}: IProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<{cep: string}>({
    resolver: zodResolver(cepSchema)
  })

  async function onSubmit({cep}: {cep: string}) {
    try{
      const response = await searchAddress(cep);
      if(response){
        setAddress(({
          ...response,
          id: '',
          phone: '',
          email: '',
          full_name: '',
          zipCode: cep,
          userId: '',
          ship_to: false,
        }));
      }
    }catch(e){
      console.log('Não foi possível salvar o endereço');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <label htmlFor="cep" className="mr-2">CEP:</label>
      <input type="text" id="cep" {...register('cep')}
        minLength={8} maxLength={8}
        className="border border-main rounded-lg p-2"
        placeholder="01153000"
      />
      {errors.cep?.message && <p className="text-sm font-bold text-danger">{errors.cep?.message}</p>}

      <button type="submit" disabled={isSubmitting} className="border border-main font-bold text-main p-2 rounded-lg ml-2 mt-2 sm:mt-0 disabled:border-danger disabled:text-danger">
        {isSubmitting ? 'Carregando...' : 'Buscar'}
      </button>
    </form>
  )
}