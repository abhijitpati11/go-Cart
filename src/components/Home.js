import React from 'react'
import { CartState } from '../context/Context';
import SingleProducts from './SingleProducts';
import Filters from './Filters';
import './homeStyle.css';


const Home = () => {

  // cartState will giveproducts and cart array as created in useReducer in context.js
  // this is further destructuring of the cartState
  const {
    state:{products},
    productState:{byStock, byFastDelivery, sort, byRating, searchQuerry }
  } = CartState();

  // function for rendering the products based on the filter
  const transformProducts = () => {
    let sortedProducts = products;

    // rendering based on ascending or descending selection
    if(sort) {
      sortedProducts = sortedProducts.sort((a, b) => 
        sort === 'lowToHigh' ? a.price-b.price : b.price-a.price
      );
    }

    // rendering based stock availability
    if(!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    // rendering based fast delivery facility
    if(byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    // rendering based on raitng
    if(byRating) {
      sortedProducts = sortedProducts.filter((prod) => 
        prod.ratings >= byRating
      );
    }

    // rendering based on search
    if(searchQuerry) {
      sortedProducts = sortedProducts.filter((prod) => 
        prod.name.toLowerCase().includes(searchQuerry)
      )
    }

    return sortedProducts;
  }
  
  return (
    <div className='home'>
      <Filters />
      <div className="productContainer">
        {
          transformProducts().map((prod) => {
            return <SingleProducts prod={prod} key={prod.id} />   
          })
        }
      </div>
    </div>
  )
}

export default Home
