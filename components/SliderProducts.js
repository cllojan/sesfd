import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Container = styled.div`
  
  margin:0 40px;
  padding:0;
`;
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      
    >
      <FaChevronRight
      className={className}
      style={{ display: "block",height:"50px",width:"20px",color:"#000",fontSize:"40px" }}
      onClick={onClick}
      />
    </div>
  );
}

const SamplePrevArrow = ( props) =>{
  const { className, style, onClick } = props;
  return (
    <div
      
    >
      <FaChevronLeft  
      className={className}   
      onClick={onClick}      
      style={{ display: "block",height:"50px",width:"20px",color:"#000",fontSize:"40px" }}/>
    </div>
  );
}
export default function ProductsGrid({ products }) {
  const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    
  };

  return (
    <Container>
      <Slider {...settings}>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
      </Slider>
     
    </Container>
  );
}
