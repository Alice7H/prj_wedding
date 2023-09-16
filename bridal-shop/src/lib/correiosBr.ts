import { calcularPrecoPrazo, consultarCep } from "correios-brasil/dist";
 // consultar cep, calcular preço prazo, rastrear encomendas
export async function searchAddress(cep: string) {
  try{
    const response = await consultarCep(cep);
    const data = {
      street: response.logradouro,
      complement: response.complemento,
      district: response.bairro,
      city: response.localidade,
      state: response.uf
    };
    return data
  }catch(e){
    console.log(e);
    return null;
  }
}

export async function handleGetPrice(cep: string) {
  try{
    let args = {
      sCepOrigem: '01153000',
      sCepDestino: cep,
      nVlPeso: '0.5',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '9',
      nVlLargura: '30',
      nCdServico: ['04014', '04510'], //Array com os códigos de serviço
      nVlDiametro: '0',
    };
    const response = await calcularPrecoPrazo(args);
    return response;
  }catch(e){
    console.error(e);
    return null;
  }
}