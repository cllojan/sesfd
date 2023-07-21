import { useState } from "react";
import styled from "styled-components";
import ProductsGrid from "./ProductsGrid";
import NewProducts from "@/components/NewProducts";

import CategoryMain from "@/components/CategoryMain"
import SliderProducts from "@/components/SliderProducts";
import Teclados from "@/components/Perifericos/Teclados";
const ContProduct = styled.div`
  height:450px;
  display:flex;
  flex-direction: column;
  margin:20px;
`
const TabsWrapper = styled.div`
  display: flex;
  align-items:center;
  position:relative;
  &::after{
    content:" ";
    z-index: 0;
    position:absolute;
    bottom:12px;
    left: 0;
    width:100%;
    height: 3px;
    background-color: #ccc;
  }
`;
const Title = styled.h2`
  font-size: 2rem;
  position:relative;
  font-weight: normal;
  @media (max-width: 768px) {
    text-align: center;
  }

  &::after{
    z-index: 100;
    content:" ";
    position:absolute;
    top:50px;
    left: 0;
    width:100%;
    height: 3px;
    background-color: #007bff;
  }
`;
const Tabs = styled.div`
  display: flex;  
  margin-top:10px;
  margin-left:20px;
  gap: 30px;
`;

const TabButton = styled.button`
  background-color: #fff;
  color: ${({ active }) => (active ? "#007bff" : "#333")};
  font-size: 1em;
  transition: all .5s ease;
  border: none;  
  cursor: pointer;
`;

const ImagesList = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
  margin-top: 20px;
`;

export default function Perifericos({teclados,mouse,headset}) {
  const [activeTab, setActiveTab] = useState(0);
  console.log(teclados)
  const imageLists = [
    {
      title: "Teclados",
      images:<Teclados products={teclados}/>
      
    },
    {
      title: "Mouses",
      images:<Teclados products={mouse}/>,
    },
    {
      title: "Headset",
      images:<Teclados products={headset}/>,
    },
    // Agrega más listas de imágenes según tus necesidades
  ];
    
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  
  return (
    <ContProduct>
      <TabsWrapper>
        <Title>Perifericos populares</Title>
        <Tabs>
        {imageLists.map((list, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            {list.title}
          </TabButton>
        ))}
        </Tabs>
       
      </TabsWrapper>
      
      {imageLists[activeTab].images}
      { 
            
      /*
        <ImagesList key={index} active={activeTab === index}>
          {list.images.map((image, imageIndex) => (
            <img key={imageIndex} src={image} alt={`Image ${imageIndex + 1}`} />
          ))}
        </ImagesList>*/
      }
    </ContProduct>
  );
}
