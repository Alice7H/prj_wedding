import { Cart } from '@/types/Cart';
import { Product } from '@/types/Products';
import axios from 'axios'
import { User } from './auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export async function loginUser(data: {email: string, password: string}){
  const response = await api.post('/login', data)
  const { token }  = response.data;
  return token;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
}){
  const response = await api.post('/register', data)
  const { token }  = response.data;
  return token;
}

export async function getProducts(type: string){
  const res = await api.get(`/product/${type}`)
  const data = await res.data;
  return data;
}

export async function getProductsById(id: string) {
  const res = await api.get(`/product/${id}`)
  if(res.status != 200) throw new Error('Erro 404, produto não encontrado')
  const data = await res.data as Product;
  return data;
}

export async function getFavoritesProducts({user, token}: {user: User, token: string}){
  const res = await api.get(`/user/favorite_prod/${user.sub}`, {
    headers: { Authorization: 'Bearer ' + token }
  })
  return res;
}

export async function verifyAvailableProduct(data: Cart){
  try{
    const res = await api.get(`/product/${data.productId}`);
    if(res.status != 200) throw new Error('Erro 404, produto não encontrado')
    const prod = await res.data as Product;
    const temp = data;
    if(prod.quantity >= 1) temp.available = true;
    else temp.available = false;
    return temp;
  }catch(e){
    console.error(e);
    return;
  }
}