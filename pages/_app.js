import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import Providers from "@/components/Providers";
import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const GlobalStyles = createGlobalStyle`  
  
  body{
    background-color: #fff;
    padding:0;
    margin:0;
    font-family:${inter.style.fontFamily};
  }
  .swal2-container{
    font-family: 'Lato', sans-serif;
  }  
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider >
          <SessionProvider>
            <Component  {...pageProps}  />
          </SessionProvider>
      </CartContextProvider>
    </>
  );
}