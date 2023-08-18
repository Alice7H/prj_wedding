import { api } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { Product } from "@/types/Products";
import Cookies from "js-cookie";

interface IProps {
  product: Product;
}

export function AddFavoriteProduct({product}: IProps){

  async function handleFavorite() {
    try{
      const user = getUser();
      const token = Cookies.get('token');
      const userId = user.sub;
      const productId = product?.id;
      const res = await api.post('/favorite_prod', {
        userId: userId,
        productId: productId
      },
      { headers: { Authorization: 'Bearer ' + token}});
      const data = await res.data;
      if(data)console.log(data);
    }catch(e){
      console.log(e);
      alert('Erro: Você não está autorizado.');
    }
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