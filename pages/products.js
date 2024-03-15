"use client"
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";

import { Category } from '@/models/Category';
import FilterProduct from '@/components/FilterProduct';
import Footer from "@/components/Footer";


const ProductCom = styled.div`
  width:100%;
  height:100%;
  display:grid;
  grid-template-columns: 350px 2fr;
`
export default function ProductsPage({products,category}) {
  return (
    <>
      <Header />
      <ProductCom>        
        <FilterProduct category={category}></FilterProduct>
        <ProductsGrid products={products} />
      </ProductCom>
      <Footer/>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find({}, null, {sort:{'_id':-1}});
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
    props:{
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(categoriasJson))
    }
  };
}