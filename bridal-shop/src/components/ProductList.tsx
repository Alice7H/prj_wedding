import Image from "next/image";
import { Product } from "@/types/Products";
import Link from "next/link";

interface IProps {
  products: Product[];
  loading: boolean;
  urlType: string;
}
export function ProductList({loading, products, urlType}: IProps) {
  if(!loading && products.length == 0){
    return <h2 className="text-center">Produtos não encontrados</h2>;
  }

  if (loading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  return  (
    <div className="w-full flex flex-col justify-center items-center text-main">
      <ul className="w-full p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <li
            key={product.id}
            className='flex flex-col justify-center items-center font-semibold text-xl text-center rounded-2xl'
          >
            <Link
              href={`/${urlType}/details/${product.id}`}
              className="flex flex-col justify-center items-center"
            >
              <Image src={product.coverUrl} alt={product.name} width={200} height={200} className="border border-main rounded-2xl" />
              <h3>{product.name}</h3>
              <p>R${product.price},00</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}