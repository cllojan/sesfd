import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import { Inter } from 'next/font/google'
import { httpAgentOptions } from "@/next.config";
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const GlobalStyles = createGlobalStyle`
  
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <html className={inter.className}>

        <body>
        <CartContextProvider >                
            <Component  {...pageProps}  />      
        </CartContextProvider>
        </body>
      </html>
      
      
    </>
  );
}
