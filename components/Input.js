import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height:25px;
  font-size:.875rem;
  padding:10px;
  margin-bottom: 5px;
  border: 1px solid rgb(229 231 235/1);  
  border-radius:.5rem;  
  transition: border-color 0.3s ease;

    &:focus{
        outline:none;

        box-shadow: 0 0 0 2px #007bff;

        border-radius:.5rem;
    }
`;

export default function Input(props) {
  return <StyledInput {...props} />
}