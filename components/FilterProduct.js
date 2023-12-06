import { use, useState, useContext, useEffect } from "react";
import { useRouter } from 'next/router';
import styled from "styled-components";
import Button from "@/components/Button";
import { Poppins } from 'next/font/google'
const roboto = Poppins({
    weight: '500',
    subsets: ['latin'],
  })

const FilterContainer = styled.div`
    height:100vh;
    margin:20px;
`
const Input = styled.input`
    height: 30px;
    padding-left:10px;
    border:2px solid #ccc;
    border-radius:5px;
    font-size:14px;
    
    &:focus{
        
        outline:none;
        border:2px solid #007bff;
        font-size:14px;
        border-radius:5px;
    }

`
const Space = styled.div`
    height:7px;
    border:none;
`
const Box = styled.div`
    display:flex;    
    align-items:center;    
`
const CheckBox = styled.input`    
    appearance: none;
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 3px;
    outline: none;
    margin-right: 10px;
    cursor: pointer;
    
    &:checked {
        background-color: #fff;
        border-color: #007bff;
    }
    &:checked::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 9px;
        border: solid #007bff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
    
`

const Inputs = styled.div`
    display:flex;
    flex-direction: column;
`

const Category = styled.div`
    height:300px;
    overflow-y:scroll;
    scrollbar-width:thin;
    scrollbar-color:#ccc transparent;

    &::-webkit-scrollbar{
        width:8px;
    }

    &::-webkit-scrollbar-track{
        background-color:transparent;
    }
    &::-webkit-scrollbar-thumb{
        background-color:#AED6F1 ;
        border-radius:4px;
    }
    &::-webkit-scrollbar-thumb:hover{
        background-color:#2E86C1;
    }

`

const Label = styled.label`
    font-size:1em;
    
`


const AddCartButton = styled.button`
  border:none;
  border-radius:4px;
  width:100%;
  height:40px;
  background:#FACC15;
  color:#000;
  font-weight:bolder;  
  margin-top:10px;
  vertical-align: middle;
  font-weight: 500;
  cursor:pointer;

  font-family:'Inter', Courier, monospace;

`
export default function FilterProduct({ category }) {
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [searchTerm, setSearchTerm] = useState(" ");
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000);
    const router = useRouter();
    
    const handleChange = (e) => {
        const categoriaSeleccionada = e.target.value;        
        
        if (categoriasSeleccionadas.includes(categoriaSeleccionada)) {
            let inxC = categoriasSeleccionadas.indexOf(categoriaSeleccionada)
            categoriasSeleccionadas.splice(inxC, 1);
            
        } else {
            setCategoriasSeleccionadas([...categoriasSeleccionadas, categoriaSeleccionada]);
            
        }

    };


    const handleSearch = (event) => {
        event.preventDefault();
        
        const categoriasQuery = categoriasSeleccionadas.join(',');
        
        router.push(`/product/search/${searchTerm}?categorys=${categoriasQuery}&min=${priceMin}&max=${priceMax}`);

    };
    return (
        <FilterContainer className="">
            <form action="" onSubmit={handleSearch}>
                <Inputs>
                    <Label className={roboto.className}>Buscar</Label>
                    <Input type="text" name="search" autoComplete="off" onChange={(e) => setSearchTerm(e.target.value)} />
                    <Label className={roboto.className}>Menor</Label>
                    <Input type="number" name="menor" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
                    <Label className={roboto.className}>Mayor</Label>
                    <Input type="number" name="mayor" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
                </Inputs>
                <Space />
                <Space />
                <Label className={roboto.className} style={{ fontSize:"1.3em",fontWeight:"500",color:"#626567" }}>Categorias</Label>
                <Space />
                <Category className="container_ca">
                    {
                        category?.map((elm, inx) => (
                            <div className="" key={inx} >
                                

                                {
                                    elm.parents.length > 0 ?
                                        <div>
                                            <label className={roboto.className} style={{ marginLeft:"3px",fontSize:"1.1em",fontWeight:"500",color:"#626567" }}>{elm.name}</label>
                                        {elm.parents.map((em, i) => (
                                            <Box key={i} className="cont" style={{ marginLeft: "30px" }}>
                                                <CheckBox

                                                    type='checkbox'
                                                    value={em._id}
                                                    id={em._id}
                                                    className="child"
                                                    onChange={e => handleChange(e)}
                                                    
                                                    data-parent-id={elm.name}
                                                />
                                                
                                                <label className={roboto.className} style={{ fontSize:"0.9em"}}>{em.name}</label>
                                            </Box>
                                        ))}

                                        </div>
                                        
                                        : <Box>
                                        <CheckBox
                                            type='checkbox'
                                            value={elm.id}
                                            id={elm.id}
                                            className="parent"
                                            onChange={e => handleChange(e)}
    
                                        />
                                        <Label className={roboto.className} style={{ fontSize:"0.9em"}}>{elm.name}</Label>
                                    </Box>
                                }
                            </div>
                        ))
                    }
                </Category>
                <AddCartButton type="submit">Buscar</AddCartButton>
            </form>
        </FilterContainer>

    )
}

