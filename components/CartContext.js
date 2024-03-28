import {createContext, useEffect, useState} from "react";
import Swal from "sweetalert2";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);
  function addProduct(productId) {
    
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "¡Producto añadido! 🛒"
    });
    setCartProducts(prev => [...prev,productId]);
  }
  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value,index) => index !== pos);
      }
      return prev;
    });
  }
  function removeItem(productId){
    
    const nuevoArray = cartProducts.filter(item => item !== productId);
    // Actualizar el estado con el nuevo array sin ocurrencias repetidas del elemento específico
    setCartProducts(nuevoArray);
    console.log(cartProducts)
  }
  function clearCart() {
    setCartProducts([]);
    ls.clear()
  }
  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart, removeItem}}>
      {children}
    </CartContext.Provider>
  );
}