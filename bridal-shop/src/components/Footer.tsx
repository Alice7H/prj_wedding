import { LinkButton } from "./LinkButton";
import Image from "next/image";
import facebookIcon from "../../public/facebook.png";
import instagramIcon from "../../public/instagram.png";
import tiktokIcon from "../../public/tiktok.png";
import ButtonUp from "../../public/buttonUp.svg";

export function Footer() {
  return (
    <footer className="mt-16 relative px-8">
      <a href="#topo" className="rounded-full absolute top-4 right-4 p-3 cursor-pointer" type="button">
        <Image src={ButtonUp} alt="Ir para o topo"/>
      </a>
      <div className="flex flex-col sm:flex-row justify-around items-center sm:items-start">
        <div>
          <h2 className="mb-4 flex-1 text-2xl text-main text-center font-bold">Contatos</h2>
          <address>
            <p>Endereço: Rua da Amizade dos Invisíveis, Santos - SP</p>
            <p>Telefone: <a href="tel:+5511999999999" className="underline" >(11) 99999-9999</a></p>
            <p>E-mail: <a href="mailto:brideall@teste.com" className="underline" >brideall@teste.com</a></p>
          </address>
          <p className="mt-5 underline"><a href="/">Política de Privacidade</a></p>
        </div>
        <div className="mt-16 sm:mt-0">
          <h2 className="flex-1 text-2xl text-main text-center font-bold mb-4">Siga-nos</h2>
          <div className="flex justify-center gap-6 m-4 text-center">
            <a href="/">
              <Image className="rounded-full w-[50px] h-[50px] border" src={facebookIcon} alt="Facebook Logo"/>
            </a>
            <a href="/">
              <Image className="rounded-full w-[50px] h-[50px] border" src={instagramIcon} alt="Instagram Logo"/>
            </a>
            <a href="/">
              <Image className="rounded-full w-[50px] h-[50px] border" src={tiktokIcon} alt="TikTok Logo"/>
            </a>
          </div>
          <div className="text-center my-8">
            <LinkButton path="/register" text="Inscreva-se"/>
          </div>
        </div>
      </div>
    </footer>
  )
}