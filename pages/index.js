
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { Inter } from 'next/font/google'


import CategoryMain from "@/components/CategoryMain"
import Perifericos from "@/components/Perifericos";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function HomePage({featuredProduct,newProducts,teclados,mouses,headset}) {
  return (
    <div className={inter.className}>
      
      <Header />      
        <Featured products={featuredProduct}/>
        <NewProducts products={newProducts} />
        <CategoryMain />
        <Perifericos teclados={teclados} mouse={mouses} headset={headset}/>
      <Footer/>
    
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '6490d4aa07756020e23836e2';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);  
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const teclados = await Product.find({
    category: "64a6e51cbaa8f76629dab695"
  });
  const mouse = await Product.find({
    category: "64a6e526baa8f76629dab699"
  });
  const headset = await Product.find({
    category: "64a6e53abaa8f76629dab6a2"
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      teclados:JSON.parse(JSON.stringify(teclados)),
      mouses:JSON.parse(JSON.stringify(mouse)),
      headset:JSON.parse(JSON.stringify(headset)),
    },
  };
}