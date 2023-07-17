import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out;
  z-index: 9999;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #333;
`;

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      const isScrolledToTop = window.scrollY === 0;

      setIsFooterVisible(isScrolledToBottom && !isScrolledToTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FooterContainer visible={isFooterVisible}>
      <FooterText>This is the footer</FooterText>
    </FooterContainer>
  );
};

export default Footer;