'use client'
import { api } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Product } from "@/types/Products";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

interface UserProduct {
  userId: string;
  productId: string;
  id: string;
  product: Product;
}

export default function Favorites() {
  const [favProducts, setFavProducts] = useState<UserProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const router = useRouter();

  useEffect(()=> {
    async function getFavorites(){
      try{
        const user = getUser();
        const token = Cookies.get('token');
        const res = await api.get(`/user/favorite_prod/${user.sub}`, {
          headers: { Authorization: 'Bearer ' + token }
        })
        if(res.status == 200){
          setFavProducts(res.data);
        }
        setLoadingProducts(false);
      }catch(error) {
        router.push('/');
      }
    }
    getFavorites();
  },[router])


  if(loadingProducts) return <p className="text-center text-main font-bold">Carregando...</p>

  return (
    <>
      <main>
        <div>
          <h1 className="text-center text-main text-title font-bold">Favoritos</h1>
          <ul className="flex gap-4 p-8">
            {favProducts ? favProducts.map(fav =>
              <li key={fav.id}>
                {/* draw star or heart */}
                <Image src={fav.product.coverUrl} alt={fav.product.name} width={200} height={200} className="border border-main rounded-2xl" />
                <h3>{fav.product.name}</h3>
                <p>R${fav.product.price},00</p>
              </li>
            ):
            <p>Você não possui vestidos ou acessórios favoritos</p>
            }
          </ul>
        </div>
      </main>
      <Footer/>
    </>
  );
}