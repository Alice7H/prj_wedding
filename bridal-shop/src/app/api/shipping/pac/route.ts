import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer';
import convert from 'xml-js';

export async function GET(request: NextRequest) {
  const cepOrigem = request.nextUrl.searchParams.get('cepOrigem');
  const cep = request.nextUrl.searchParams.get('cep')
  const peso = request.nextUrl.searchParams.get('peso');

  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=${cepOrigem}&sCepDestino=${cep}&nVlPeso=${peso}&nCdFormato=1&nVlComprimento=20&nVlAltura=9&nVlLargura=30&nVlDiametro=0&nCdServico=04510&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`, {timeout: 0, waitUntil: 'networkidle0'});
  try{
    const folderContent = await page.$eval('#folder0', el => el.textContent);
    if(folderContent){
      const jsonResponse = await convert.xml2js(folderContent, {compact: true})
      await browser.close();
      return NextResponse.json({message: jsonResponse})
    }
  }catch(e: any){
    console.log(e.message);
    return NextResponse.json({error: 'Error: não foi possível calcular o frete'}, { status: 500 })
  }
}