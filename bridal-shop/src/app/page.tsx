import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { LinkButton } from "@/components/LinkButton";
import Image from "next/image";
import production from "../../public/dresses/production.svg"
import dress1 from "../../public/dresses/image_main1.svg"
import dressImage1 from "../../public/dresses/image3.svg"
import dressImage2 from "../../public/dresses/image5.svg"
import dressImage3 from "../../public/dresses/image2.svg"
import dressImage4 from "../../public/dresses/image4.svg"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col px-8">
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4">
          <div>
            <h1 className="max-w-full sm:max-w-[50%] text-title text-main font-bold text-center mb-3 mt-1">Vestidos de noiva</h1>
            <ul className="sm:w-[40vw] flex flex-col gap-2 text-main text-lg">
              <li> - Vestidos modernos</li>
              <li> - Vestidos de alta costura</li>
              <li> - Ofertas</li>
              <li className="self-center">
                <LinkButton path="/register" text="Inscreva-se"/>
              </li>
            </ul>
            <div className="max-w-[730px] self-center sm:self-start sm:w-[40vw] mt-16">
              <Carousel />
            </div>
          </div>
          <div>
            <Image src={dress1} alt="vestido" className="object-cover rounded-3xl self-center sm:max-w-[350px] sm:max-h-[80vh]"/>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-title text-main text-center font-bold mb-8">Nosso processo de criação</h2>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
            <Image src={production} alt="confecção de vestido em ateliê" className="w-auto rounded-3xl h-[250px]"/>
            <div className="pt-4 sm:p-0 sm:max-w-[50%]">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem nesciunt, nulla nisi dolor minus aperiam odit facere quod officia, exercitationem inventore esse ipsa placeat optio.</p>
              <p className="py-2">Voluptas minima maiores architecto. Consequuntur! Rerum quisquam, unde natus voluptas sit cupiditate minima impedit iste iure molestias dolores accusantium fuga ad explicabo aliquam necessitatibus</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-title text-main text-center font-bold mb-8">Mais populares</h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-around items-center gap-4">
            <Image src={dressImage1} alt="vestido popular" className="object-cover rounded-xl w-[200px] h-[200px]"/>
            <Image src={dressImage2} alt="vestido popular" className="object-cover rounded-xl w-[200px] h-[200px]"/>
            <Image src={dressImage3} alt="vestido popular" className="object-cover rounded-xl w-[200px] h-[200px]"/>
            <Image src={dressImage4} alt="vestido popular" className="object-cover rounded-xl w-[200px] h-[200px]"/>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}
