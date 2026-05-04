import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type Product = {
  id: string;
  name: string;
  price: string;
  photoUri: string;
};

interface State {
  products: Product[];
}

const MAX_PRODUCTS = 5;

const initialState: State = {
  products: [],
};

type Action =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_PRODUCT':
      if (state.products.length >= MAX_PRODUCTS) return state;
      return { ...state, products: [...state.products, action.payload] };
    case 'RESET':
      return { ...state, products: [] };
    default:
      return state;
  }
}

const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
export { MAX_PRODUCTS };
