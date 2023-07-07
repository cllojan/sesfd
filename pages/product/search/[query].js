import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Category }from '@/models/Category';
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import mongoose from "mongoose";
import FilterProduct from '@/components/FilterProduct';


export default function SearchProduct({products,category}){
    return (
        <>
          <Header />
        
          <Center>
            <Title>All products</Title>
            <div>
            <FilterProduct category={category}></FilterProduct>
              <ProductsGrid products={products} />
            </div>
            
          </Center>
        </>
      );
}
export async function getServerSideProps(context) {
     await mongooseConnect();
     const {query} = context.query
     const categoryIds = ["6490d47f07756020e23836d9", "64a6e321baa8f76629dab656"];

    const validCategoryIds = categoryIds.filter((categoryId) =>
      mongoose.Types.ObjectId.isValid(categoryId)
    );
     const products = await Product.find({
      $and:[
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            
          ],

        },
        {category:{$in:validCategoryIds}},
        { price: { $gte: 100, $lte: 250 }}
      ]
        
      });

    //const product = await db.collection("products")        
    const category = await Category.find().populate('parent')
    const categoriasHijas = {};

    for (const categoriaPrincipal of category) {
      const categoriaId = categoriaPrincipal._id;
      const hijas = await Category.find({ parent: categoriaId }, 'name');
      categoriasHijas[categoriaId] = hijas.map((hija) => ({
        id: hija._id,
        name: hija.name
      }));
    }

    const categoriasJson = category.map((categoriaPrincipal) => ({
      id: categoriaPrincipal._id,
      name: categoriaPrincipal.name,
      parents: categoriasHijas[categoriaPrincipal._id] || []
    }));

    console.log(categoriasJson)
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        category:JSON.parse(JSON.stringify(category))
      }
    }
  }