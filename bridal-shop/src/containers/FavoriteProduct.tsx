import { getUser } from "@/lib/auth";
import { Product } from "@/types/Products";

interface IProps {
  product: Product;
}

export function FavoriteProduct({product}: IProps){

  function handleFavorite() {
    try{
      const user = getUser();
      const userId = user.sub;
      const productId = product?.id;
      // save favorite item
    }catch(e){ console.log(e)}
  }

  return (
    <button
      onClick={handleFavorite}
      className="text-main font-bold border rounded-lg py-2 px-4 mt-4"
    >
      Favoritar
    </button>
  )
}