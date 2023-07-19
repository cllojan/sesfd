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

export default function HomePage({featuredProduct,newProducts,productos}) {
  return (
    <div className={inter.className}>
      <Header />      
        <Featured products={featuredProduct}/>
        <NewProducts products={newProducts} />
        <CategoryMain />
        <Perifericos teclados={productos}/>
      <Footer/>
    
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '6490d4aa07756020e23836e2';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const categoriasIds = ["6490d47f07756020e23836d9"];
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const products = await Product.find({
    $and: [
      {
        $or: [
          { title: { $regex: " ", $options: 'i' } },
          { description: { $regex: " ", $options: 'i' } },
        ],
      },
      { category: { $in: categoriasIds } },
      
    ],
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      productos:JSON.parse(JSON.stringify(products)),
    },
  };
}