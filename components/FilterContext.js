import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  
  return (
    <FilterContext.Provider value={{ categoriasSeleccionadas, setCategoriasSeleccionadas }}>
      {children}
    </FilterContext.Provider>
  );
};
