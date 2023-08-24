import Link from "next/link";
import { Footer } from "./Footer";

export function EmptyCart() {
  return(
    <>
      <main className="flex flex-col px-8 items-center h-auto sm:h-[30vh]">
        <h1 className="text-main text-title font-bold">Carrinho de compras</h1>
        <p>Você não possui produtos no carrinho</p>
        <div className="flex gap-4">
          <Link  href="/dresses" className="border border-main rounded-lg p-2 max-w-[200px] mt-4">
            Ver vestidos
          </Link>
          <Link href="/accessories" className="border border-main rounded-lg p-2 max-w-[200px] mt-4">
            Ver acessórios
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}