import { CartContext } from '@/context/cart.context'
import { useContext} from 'react'

export function useCart(){
  return useContext(CartContext);
}