import { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducers';


// name of the context
const Cart = createContext();
// this will not render multiple times, only once
faker.seed(99);

const Context = ({ children }) => {

  // getting the fake pduduct data list from faker.js 
  
  const products = [...Array(100)].map(() => ({
    id : faker.datatype.uuid(),
    name : faker.commerce.productName(),
    price : faker.commerce.price(),
    image : faker.image.image(),
    inStock : faker.helpers.arrayElement([0,1,2,3,4,5,6,7,8,9,10]),
    fastDelivery : faker.datatype.boolean(),
    ratings : faker.helpers.arrayElement([1,2,3,4,5])
  }));

  // useReducer-> const [state, dispatch] = useReducer(reducer, initialState); 
  const [state, dispatch] = useReducer(cartReducer, {
    products : products,
    cart : []
  })

  // reducer for the filtering logic
  const [ productState, productDispatch ] = useReducer(productReducer, {
    byStock: false, //to sort by available in stock
    byFastDelivery: false,
    byRating: 0,
    searchQuerry: ""
  })

  return (
    // this value is accessible in the entire application like a separate container
    <Cart.Provider value={{state, dispatch, productState, productDispatch}}> {children} </Cart.Provider>
  )
}

export default Context;

export const CartState = () => {
  return useContext(Cart)
}
