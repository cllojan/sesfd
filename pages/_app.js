import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import { Inter } from 'next/font/google'
import { httpAgentOptions } from "@/next.config";
import Head from 'next/head'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const GlobalStyles = createGlobalStyle`
  
  body{
    background-color: #fff;
    padding:0;
    margin:0;
    
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,100&display=swap" rel="stylesheet"></link>
      </Head>
      <GlobalStyles />
      

        <div className={inter.className}>
          <CartContextProvider >                
            <Component  {...pageProps}  />      
          </CartContextProvider>
        </div>
      
      
      
    </>
  );
}
