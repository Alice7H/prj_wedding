import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  const cepOrigem = parseInt(request.nextUrl.searchParams.get('cepOrigem') as string);
  const cep = parseInt(request.nextUrl.searchParams.get('cep') as string);
  const peso = parseInt(request.nextUrl.searchParams.get('peso') as string);

  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });
  await page.goto(`https://www.cepcerto.com/ws/json-frete/${cepOrigem}/${cep}/${peso}`, {timeout: 0, waitUntil: 'networkidle0'});
  try{
    const folderContent = await page.$eval('body', el => el.innerText);
    if(folderContent){
    await page.close();
    await browser.close();
      return NextResponse.json({message: folderContent}, { status: 200 })
    }
  }catch(e: any){
    console.log(e.message);
    return NextResponse.json({error: 'Error: não foi possível calcular o frete'}, { status: 500 })
  }
}