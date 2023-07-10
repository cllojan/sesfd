import styled from "styled-components";

const StyledDiv = styled.div`
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  gap:30px;
  width:100vw;  
  margin: 10px  auto;
  padding: 0 20px;
`;

export default function Center({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}