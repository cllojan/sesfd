import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";


export default function SearchProduct({products}){
    return (
        <>
          <Header />
          <Center>
            <Title>All products</Title>
            <ProductsGrid products={products} />
          </Center>
        </>
      );
}
export async function getServerSideProps(context) {
     await mongooseConnect();
     const {query} = context.query
     const products = await Product.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // Búsqueda en el título (insensible a mayúsculas y minúsculas)          
          { description: { $regex: query, $options: "i" } }, // Búsqueda en la descripción (insensible a mayúsculas y minúsculas)
        ],
      });

    //const product = await db.collection("products")        
    
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      }
    }
  }