import styled from "styled-components";

const HeroBannerWrapper = styled.div`
  background-image: url("https://th.bing.com/th/id/R.44290ccaf1b4706c84325884fadba42b?rik=9Xz5Uhj7DNLtkw&riu=http%3a%2f%2fgalaxygamingnews.com%2fwp-content%2fuploads%2f2021%2f11%2fshutterstock_1753061831.jpg&ehk=EsT8gTxn0ng%2foQsHiv3BxORuQFrRDxmFoONuVTx%2f4W8%3d&risl=&pid=ImgRaw&r=0");
  background-size: cover;
  background-position: center;
  height: 400px; /* Ajusta la altura según tus necesidades */
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
        <HeroBannerTitle>Welcome to Our Store</HeroBannerTitle>
        <HeroBannerDescription>
          Discover the latest trends in fashion and find your perfect style.
        </HeroBannerDescription>
      </HeroBannerContent>
    </HeroBannerWrapper>
  );
}
