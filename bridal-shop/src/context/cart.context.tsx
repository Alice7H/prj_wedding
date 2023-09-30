'use client'
// import { verifyAvailableProduct } from '@/lib/api';
import { Cart } from '@/types/Cart';
import { createContext, useState, useEffect } from 'react'

interface CartContextState {
  cartItems: Cart[],
  addToCart: (item: Cart) => void,
  removeFromCart: (item: Cart) => void,
  clearCart: () => void,
  getCartTotal: () => number,
}
export const CartContext = createContext<CartContextState>({
  cartItems: [],
  addToCart: () => null,
  removeFromCart: () => undefined,
  clearCart: () => null,
  getCartTotal: () => 0,
});

export function CartProvider ({ children }: { children: React.ReactNode}) {
  const [cartItems, setCartItems] = useState<Cart[]>([]);

  function addToCart(item: Cart) {
    const isItemInCart = cartItems.find((cartItem) => (cartItem.productId === item.productId && cartItem.size === item.size));
    if (isItemInCart) {
      setCartItems(cartItems.map((cartItem) =>
        cartItem.productId === item.productId ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1}]);
    }
  };

  const removeFromCart = (item: Cart) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart?.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  function clearCart() {
    setCartItems([]);
  };

  function getCartTotal() {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    if(cartItems.length > 0){
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    async function getAvailableProducts(){
      const cartItems = localStorage.getItem("cart");
      if(cartItems == null) return;

      const tempProducts = JSON.parse(cartItems);
      if(tempProducts){
        // for(let i = 0; i < tempProducts.length; i++){
        //   const product = await verifyAvailableProduct(tempProducts[i]);
        //   tempProducts.push(product as Cart)
        // }
        setCartItems([...tempProducts]);
      }
    }
    getAvailableProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}