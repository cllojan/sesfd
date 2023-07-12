import styled from "styled-components";

const StyledDiv = styled.div`
 width:100%;
  height:100vh;
  display:grid;
  grid-template-columns: 350px 2fr;
`;

export default function Center({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}