import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from '@/models/Category';
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import mongoose from "mongoose";
import FilterProduct from '@/components/FilterProduct';


export default function SearchProduct({ products, category }) {

  return (
    <>
      <Header />

      <Center>                
          <FilterProduct category={category}></FilterProduct>
          <ProductsGrid products={products} />        
      </Center>
    </>
  );
}
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { query, categorys,min,max } = context.query
  const searchTerm = query.length === "" ? " " : query;
  const categoryIds = categorys?.length > 0 ? categorys.split(",") : categorys ;    
  console.log(context);
  const productsQuery = {
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],    
  };  
  if (categoryIds?.length > 0) {
    const validCategoryIds = categoryIds?.filter((categoryId) =>
      mongoose.Types.ObjectId.isValid(categoryId)
    );
    productsQuery.category = { $in: validCategoryIds };
  }
  if(min && max ){
    productsQuery.price = { $gte: min, $lte: max };
  }

  const products = await Product.find(productsQuery);
  /**
   * 
   *  $and:[
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
   */



  //const product = await db.collection("products")        
  //const category = await Category.find().populate('parent')
  const category = await Category.find({ parent: { $exists: false } }, 'name');
  const categoriasHijas = {};

  for (const categoriaPrincipal of category) {
    const categoriaId = categoriaPrincipal._id;
    const hijas = await Category.find({ parent: categoriaId }, 'name');
    categoriasHijas[categoriaId] = hijas;
  }

  const categoriasJson = category.map((categoriaPrincipal) => ({
    id: categoriaPrincipal._id,
    name: categoriaPrincipal.name,
    parents: categoriasHijas[categoriaPrincipal._id] || []
  }));
  for (const categoria of categoriasJson) {
    categoria.parents = categoria.parents.filter((hija) => !categoriasJson.some((c) => c.id === hija.id));
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(categoriasJson))
    }
  }
}