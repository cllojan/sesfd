import { use, useState,useContext, useEffect } from "react";
import {useRouter} from 'next/router';


export default function FilterProduct({category}) {
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [searchTerm, setSearchTerm] = useState(" ");
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000);
    const router = useRouter();
    
    const listCategorias = []
    const handleChange = (e) => {
      const categoriaSeleccionada = e.target.value;     
      console.log(e.target.dataset.parentId);
      if(categoriasSeleccionadas.includes(categoriaSeleccionada)){
        let inxC = categoriasSeleccionadas.indexOf(categoriaSeleccionada)
        categoriasSeleccionadas.splice(inxC,1);
      } else{
        setCategoriasSeleccionadas([...categoriasSeleccionadas, categoriaSeleccionada]);        
      }
      
    };   

    const handleSearch = (event) => {    
        event.preventDefault();
        
        const categoriasQuery = categoriasSeleccionadas.join(',');
        console.log(categoriasQuery)
        router.push(`/product/search/${searchTerm}?categorys=${categoriasQuery}&min=${priceMin}&max=${priceMax}`);
        
      };
    return (
        <div className="">
            <form action="" onSubmit={handleSearch}>
                <input type="text" name="search" onChange={(e)=>setSearchTerm(e.target.value)}/>
                <label htmlFor="">Menor</label>
                <input type="text" name="menor" value={priceMin} onChange={(e)=>setPriceMin(e.target.value)}/>
                <label htmlFor="">Mayor</label>
                <input type="text" name="mayor" value={priceMax} onChange={(e)=>setPriceMax(e.target.value)}/>
                <div className="container_ca">
                    {
                        category?.map((elm,inx) => (
                            <div className="" key={inx} >
                                <input 
                                type='checkbox' 
                                value={elm.id} 
                                onChange={e=>handleChange(e)} 
                                
                                />
                               
                                <label htmlFor="">{elm.name}</label>
                                {
                                    elm.parents.length >0?                                    
                                        elm.parents.map((em,i) =>(
                                            <div key={i} className="cont" style={{marginLeft:"30px"}}>                                                
                                                <input 
                                                    type='checkbox' 
                                                    value={em.id}
                                                    
                                                    onChange={e=>handleChange(e)}
                                                    checked={categoriasSeleccionadas.includes(elm.name)}
                                                    data-parent-id={elm.name}
                                                    />
                                                <label htmlFor="">{em.name}</label>
                                            </div>
                                            ))
                                    :false
                                }
                            </div>
                        ))
                    }
                </div>
                <button type="submit">Click</button>
            </form>
        </div>

    )
}

