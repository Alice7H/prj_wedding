import { AddFavoriteProduct } from "@/containers/AddFavoriteProduct";
import { BuyProduct } from "@/containers/BuyProduct";
import { Product } from "@/types/Products";
import Image from "next/image";

interface IProps {
  product: Product;
}
export function ProductDetails({product}: IProps ) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-main">
        <div className="leading-loose">
          <h1 className="text-title">{product?.name}</h1>
          <span className="text-sm">Ref: {product?.id}</span>
          <p className="text-2xl">Preço: {product?.price}</p>
          <div className="border border-bottom border-b-main w-[50vw] sm:w-[35vw] my-4"></div>
          <p className="max-w-[50vw] mb-4">{product?.description}</p>
          <p>Comprimento: {product?.length}</p>
          <p>Medidas: {product?.measurements}</p>
          <p>Quantidade: {product?.quantity}</p>
          <p>Cor: {product?.color}</p>
          <p>Composição: {product?.composition}</p>
        </div>
        <div className="flex">
          {
            product?.coverUrl &&
            <Image className="rounded-3xl hover:scale-150 hover:z-10 transition duration-500 cursor-zoom-out"
            src={product.coverUrl} alt="Vestido"
            width={400} height={400}/>
          }
        </div>
      </div>
      {
        product && product.quantity > 0  &&
        <div className="flex items-center justify-center gap-4 text-center w-full sm:w-1/2">
          <BuyProduct product={product} />
          <AddFavoriteProduct product={product} />
        </div>
      }
    </>
  )
}