import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

interface IFormInput {
  cep: string;
  setCep: Dispatch<SetStateAction<string>>;
  searchAddressByCep: (event: FormEvent<HTMLFormElement>) => void;
  loadingAddress: boolean;
}

export function AddressByCep ({cep, setCep, searchAddressByCep, loadingAddress}: IFormInput) {

  return (
    <form onSubmit={searchAddressByCep}>
      <label htmlFor="cep" className="mr-2">CEP:</label>
      <input type="text" id="cep" name="cep" minLength={8} maxLength={8} className="border border-main rounded-lg p-2"
      onChange={(e:ChangeEvent<HTMLInputElement>)=>setCep(e.target.value)}
      value={cep}
      />
      <button type="submit" disabled={loadingAddress} className="border border-main font-bold text-main p-2 rounded-lg ml-2 mt-2 sm:mt-0">
        {loadingAddress ? 'Carregando...' : 'Buscar'}
      </button>
    </form>
  )
}