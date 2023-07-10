import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const GlobalStyles = createGlobalStyle`
  
  @font-face {
    font-family: 'Lato';
    src: url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,800;1,300;1,400;1,600;1,800&display=swap') format('woff2');
    /* Agrega aquí otros formatos de fuente si los tienes */
    /* Ajusta la ruta del archivo si la carpeta fonts está en un directorio diferente */
    font-weight: normal;
    font-style: normal;
  }
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Lato', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <html  className={inter.className}>
      <CartContextProvider >        
        
          <Component  {...pageProps}  />
        
      </CartContextProvider>
      </html>
    </>
  );
}
