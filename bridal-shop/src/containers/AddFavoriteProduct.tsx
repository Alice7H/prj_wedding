import { api } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { favProduct } from "@/types/FavoriteProduct";
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

      const isAdded = await isProductAlreadyAdded(productId);
      if(isAdded){
        alert('Este produto já foi favoritado');
        return;
      }
      const res = await api.post('/favorite_prod', {
        userId: userId,
        productId: productId
      },
      { headers: { Authorization: 'Bearer ' + token}});
      const data = await res.data;
      if(data)alert(`${data.product.name} favoritado`);
    }catch(e){
      console.log(e);
      alert('Erro: Você não está autorizado.');
    }
  }

  async function isProductAlreadyAdded(productId: string){
    try{
      const user = getUser();
      const token = Cookies.get('token');
      const favorites = await api.get(`/user/favorite_prod/${user.sub}`, {
        headers: { Authorization: 'Bearer ' + token}
      });

      const produtos = await favorites.data;
      const res = produtos.filter((fav: favProduct) => fav.product.id == productId);
      return res.length > 0 ? true : false;
    }catch(e){
      alert('Erro inesperado');
      return false;
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