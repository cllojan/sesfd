import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { Inter } from 'next/font/google'

import CategoryMain from "@/components/CategoryMain"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function HomePage({featuredProduct,newProducts}) {
  return (
    <div className={inter.className}>
      <Header />      
        <Featured products={featuredProduct}/>
        <NewProducts products={newProducts} />
        <CategoryMain />
      <Footer/>
    
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '6490d4aa07756020e23836e2';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}