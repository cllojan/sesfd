import styled from "styled-components";

const HeroBannerWrapper = styled.div`
  background-image: url("https://images.shopcdn.co.uk/ef/10/ef108b7f84bbd94f610326d7edb18dd5/1024x1024/webp/fit?quality=100");
  background-size: cover;
  
  height: 500px; /* Ajusta la altura según tus necesidades */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.6); /* Cambia el valor de la opacidad aquí */
`;

const HeroBannerContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const HeroBannerTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const HeroBannerDescription = styled.p`
  font-size: 1rem;
`;

export default function HeroBanner() {
  return (
    <HeroBannerWrapper>
      <HeroBannerContent>
        <HeroBannerTitle>Bienvenido a nuestra tienda</HeroBannerTitle>
        <HeroBannerDescription>          
          Descubre los productos tecnologicos mas populares
        </HeroBannerDescription>
      </HeroBannerContent>
    </HeroBannerWrapper>
  );
}
