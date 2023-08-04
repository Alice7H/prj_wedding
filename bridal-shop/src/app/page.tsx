import { Footer } from "@/components/Footer";
import { LinkButton } from "@/components/LinkButton";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col py-4 px-8 sm:py-24 relative">
        <>
          <div className="border self-center sm:absolute sm:right-0 sm:top-12 w-[80vw] sm:w-[calc(50vw-8px)] h-[412px] m-2">
            image
          </div>
          <h1 className="text-title text-main font-bold text-center sm:text-left sm:pl-[calc(40%-360px)] mb-3 mt-1">Vestidos de noiva</h1>
          <ul className="sm:w-[40vw] flex flex-col gap-2 text-main text-lg">
            <li> - Vestidos para noite</li>
            <li> - Vestidos para Coquetéis</li>
            <li> - Ofertas</li>
            <li className="self-center">
              <LinkButton path="/register" text="Inscreva-se"/>
            </li>
          </ul>
          <div className="border self-center sm:self-start w-[80vw] h-[200px] sm:w-[40vw] sm:h-[150px] mt-4">
            carrousel
          </div>
        </>

        <div className="mt-16">
          <h2 className="text-title text-main text-center font-bold mb-8">Nosso processo de criação</h2>
          <div className="flex flex-col sm:flex-row ">
            <div className="border w-full h-[200px]">image</div>
            <div className="px-4 pt-4 sm:pt-0">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem nesciunt, nulla nisi dolor minus aperiam odit facere quod officia, exercitationem inventore esse ipsa placeat optio.</p>
              <p className="py-2">Voluptas minima maiores architecto. Consequuntur! Rerum quisquam, unde natus voluptas sit cupiditate minima impedit iste iure molestias dolores accusantium fuga ad explicabo aliquam necessitatibus</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-title text-main text-center font-bold mb-8">Mais populares</h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-center gap-4">
            <div className="border w-[200px] h-[200px]">image</div>
            <div className="border w-[200px] h-[200px]">image</div>
            <div className="border w-[200px] h-[200px]">image</div>
            <div className="border w-[200px] h-[200px]">image</div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}
