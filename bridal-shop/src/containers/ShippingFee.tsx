import { useState } from "react";

interface Service {
  ceporigem: string,
  cepdestino: string,
  valorpac: string,
  valorsedex: string,
  prazopac: string,
  prazosedex: string,
}

export function ShippingFee({cep, qtd}: {cep:string, qtd: number}) {
  const [shippingFee, setShippingFee] = useState<Service|null>(null);
  const [loadingFee, setLoadingFee] = useState(false);
  const pesoGramas = qtd == 0 ? 500 : (500 * qtd);
  const cepOrigem = '01153000';

  async function getShippingFee(){
    try{
      setLoadingFee(true);
      const res = await fetch(`http://localhost:3000/api/shipping?cepOrigem=${cepOrigem}&cep=${cep}&peso=${pesoGramas}`);
      setLoadingFee(false);
      if(res.status == 200){
        setShippingFee(null);
        const data = await res.json();
        const object = JSON.parse(data.message);
        setShippingFee(object);
      }
    }catch(e){
      console.error(e);
    }
  }

  return(
    <>
    <button onClick={getShippingFee} disabled={loadingFee} type="button"
    className="border border-main rounded-lg text-main font-bold p-2 my-2 mr-2 disabled:text-danger disabled:border-danger disabled:cursor-progress"
    >
      { !loadingFee ? 'Calcular via SEDEX e PAC' : 'Calculando...'}
    </button>
    <p>Sedex: {shippingFee?.valorsedex ? `${shippingFee?.prazosedex} dia(s) - R$ ${shippingFee.valorsedex.replace(',','.')}` : 'desconhecido'}</p>
    <p>PAC: {shippingFee?.valorpac ? `${shippingFee?.prazopac} dia(s) - R$ ${shippingFee?.valorpac.replace(',','.')}` : 'desconhecido'}</p>
    <p>*O pacote possui o tamanho 20 x 20 x 10.</p>
  </>
  );
}