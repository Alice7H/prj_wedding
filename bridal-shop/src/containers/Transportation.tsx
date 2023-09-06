import { handleGetPrice, searchAddress } from "@/lib/correiosBr";
import { FormEvent, useState } from "react";
import { AddressByCep } from "../components/AddressByCep";
import { Address } from "@/types/Address";
import { ClientAddressForm } from "./ClientAddressForm";
import Link from "next/link";

export function Transportation() {
  const [cep, setCep] = useState('01153000');
  const [address, setAddress] = useState<Address>({
    userId: '',
    street: '',
    complement: '',
    district: '',
    city: 'São Paulo',
    state: 'SP',
  });

  async function searchAddressByCep(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const response = await searchAddress(cep);
    if(response){
      console.log(response);
      setAddress({...response, userId: ''});
    }
  }

  // async function calculateTransportation(){
  //   if(!cep) {
  //     alert('Informe o cep');
  //     return;
  //   }
  //   const response = await handleGetPrice(cep);
  //   if(response != null && response.length > 0){
  //     // Codigo, Valor, PrazoEntrega, Erro, MsgErro
  //     response.forEach(element => {
  //       console.log(element);
  //     });
  //   }else {
  //     alert('Não foi possível calcular.');
  //   }
  // }

  return (
    <div className="border p-4 my-2 text-main rounded-sm">
      <AddressByCep cep={cep} setCep={setCep} searchAddressByCep={searchAddressByCep} />
      <div className="flex my-2 justify-center gap-2">
        <Link
          href={`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=01153000&sCepDestino=${cep}&nVlPeso=0.5&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=30&nVlDiametro=0&nCdServico=04014&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`}
          target="_blank" rel="noopener noreferrer"
          className="border border-main rounded-lg text-main font-bold p-2 my-2"
        >*Ver valor de frete (sedex)</Link>
        <Link
          href={`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=01153000&sCepDestino=${cep}&nVlPeso=0.5&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=30&nVlDiametro=0&nCdServico=04510&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`}
          target="_blank" rel="noopener noreferrer"
          className="border border-main rounded-lg text-main font-bold p-2 my-2"
        >*Ver valor de frete (pac)</Link>
      </div>
      {/* <button onClick={calculateTransportation} type="button" className="border border-main rounded-lg text-main font-bold p-2 my-2"> Calcular frete</button> */}
      {/* <ClientAddressForm cep={cep} address={address} setAddress={setAddress} /> */}
      <p className="text-left">* O frete refere-se à 2 vestidos ou 4 acessórios.</p>
    </div>
  )
}