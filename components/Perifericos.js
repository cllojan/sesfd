import { useState } from "react";
import styled from "styled-components";
import ProductsGrid from "./ProductsGrid";
import NewProducts from "@/components/NewProducts";

import CategoryMain from "@/components/CategoryMain"
import SliderProducts from "@/components/SliderProducts";
import Teclados from "@/components/Perifericos/Teclados";
const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background-color: ${({ active }) => (active ? "#333" : "#ddd")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const ImagesList = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
  margin-top: 20px;
`;

export default function Perifericos({teclados}) {
  const [activeTab, setActiveTab] = useState(0);
  const imageLists = [
    {
      title: "List 1",
      images:<Teclados products={teclados}/>
      
    },
    {
      title: "List 2",
      images:<CategoryMain />,
    },
    // Agrega más listas de imágenes según tus necesidades
  ];
    
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  
  return (
    <div>
      <TabsWrapper>
        {imageLists.map((list, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            {list.title}
          </TabButton>
        ))}
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
    </div>
  );
}
