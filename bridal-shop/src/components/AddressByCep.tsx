import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

interface IFormInput {
  cep: string;
  setCep: Dispatch<SetStateAction<string>>;
  searchAddressByCep: (event: FormEvent<HTMLFormElement>) => void;
}

export function AddressByCep ({cep, setCep, searchAddressByCep}: IFormInput) {

  return (
    <form onSubmit={searchAddressByCep}>
      <label htmlFor="cep" className="mr-2">CEP:</label>
      <input type="string" id="cep" name="cep" min={8} max={8}
      className="border border-main rounded-lg p-2"
      onChange={(e:ChangeEvent<HTMLInputElement>)=>setCep(e.target.value)}
      value={cep}
      />
      <button type="submit" className="border border-main font-bold text-main p-2 rounded-lg ml-2">Buscar</button>
    </form>
  )
}