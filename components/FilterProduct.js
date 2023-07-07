import { use, useState,useContext, useEffect } from "react";
import {useRouter} from 'next/router';


export default function FilterProduct({category}) {
    const router = useRouter();
    
    const listCategorias = []
    const handleChange = (e) => {
        listCategorias.push(e.target.value)            
    };   
    const handleSearch = (event) => {    
        event.preventDefault();
        let a = listCategorias.join(",")
        console.log(a);
        router.push({
          pathname:`/product/search/amd?category=${a}`
        });
        
      };
    return (
        <div className="">
            <form action="" onSubmit={handleSearch}>
                <input type="text" name="search" />
                <label htmlFor="">Menor</label>
                <input type="text" name="menor" />
                <label htmlFor="">Mayor</label>
                <input type="text" name="mayor" />
                <div className="container_ca">
                    {
                        category?.map((elm,inx) => (
                            <div className="" key={inx} >
                                <input type='checkbox' value={elm.name} onChange={e=>handleChange(e)}/>
                                <label htmlFor="">{elm.name}</label>
                                {
                                    elm.parents.length >0?                                    
                                        elm.parents.map((em,i) =>(
                                            <div key={i} className=" cont" style={{marginLeft:"30px"}}>                                                
                                                <input type='checkbox' value={em.name} onChange={e=>handleChange(e)} checked/>
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

