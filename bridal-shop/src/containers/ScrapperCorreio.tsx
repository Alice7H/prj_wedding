import { useState } from "react";

interface Servicos {
  cServico: {
    Codigo: {_text: string; },
    Valor: {_text: string; },
    PrazoEntrega: {_text: string; },
    ValorSemAdicionais: {_text: string; },
    ValorAvisoRecebimento: {_text: string; },
    ValorValorDeclarado: {_text: string; },
    EntregaDomiciliar: {_text: string},
    EntregaSabado: {_text: string},
    obsFim: {_text: string},
    Erro: {_text: string},
    MsgErro: {_text: string}
  };
}

export function ScrapperCorreio({cep, qtd}: {cep:string, qtd: number}) {
  const [sedex, setSedex] = useState<Servicos|null>(null);
  const [pac, setPac] = useState<Servicos|null>(null);
  const peso = qtd == 0 ? 0.5 : (0.5 * qtd);
  const cepOrigem = '01153000';

  const getSedexShippingFee = () => getShippingFee('sedex');
  const getPacShippingFee = () => getShippingFee('pac');

  async function getShippingFee(type: string){
    try{
      const res = await fetch(`http://localhost:3000/api/shipping/${type}?cepOrigem=${cepOrigem}&cep=${cep}&peso=${peso}`);
      console.log(res)
      if(res.status != 200){
        alert('Error: não foi possível calcular o frete');
        return;
      }
      const data = await res.json();
      console.log(JSON.parse(data));

      const service: Servicos = data.message['Servicos'];
      if(type == 'sedex') setSedex(service);
      setPac(service);
    }catch(e){
      console.error(e);
    }
  }

  return(
    <>
      <button onClick={getSedexShippingFee} type="button" className="border border-main rounded-lg text-main font-bold p-2 my-2 mr-2">
        Calcular via SEDEX
      </button>
      <button onClick={getPacShippingFee} type="button" className="border border-main rounded-lg text-main font-bold p-2 my-2">
        Calcular via PAC
      </button>
      <p>Sedex: {sedex ? `${sedex.cServico.Valor._text} - ${parseFloat(sedex.cServico.PrazoEntrega._text).toFixed(2) + 3}` : '00.00'}</p>
      <p>PAC: {pac ? `${pac.cServico.Valor._text} - ${parseFloat(pac.cServico.PrazoEntrega._text).toFixed(2) + 3}` : '00.00'}</p>
    </>
  )
}