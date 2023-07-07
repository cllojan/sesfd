import { use, useState } from "react";


export default function FilterProduct({category}) {
        
    return (
        <div className="">
            <form action="">
                <input type="text" name="search" />
                <label htmlFor="">Menor</label>
                <input type="text" name="menor" />
                <label htmlFor="">Mayor</label>
                <input type="text" name="mayor" />
                <div className="container_ca">
                    {
                        category?.map((elm,inx) => (
                            <h1 key={inx}>{elm.name}</h1>
                        ))
                    }
                </div>
            </form>
        </div>

    )
}

