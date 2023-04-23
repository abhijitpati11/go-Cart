import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './homeStyle.css';
import Rating from './Rating';
import { CartState } from '../context/Context';

const Filters = () => {

  

  // states to handle filter functionality
  const { productState:{byStock, byFastDelivery, sort, byRating, searchQuerry }, 
    productDispatch 
  } = CartState();
  console.log(byStock, byFastDelivery, sort, byRating, searchQuerry);
 
  return (
    <div className='filters'> 
      <div className="title">Filter Products</div>
      <span>
        <Form.Check 
          onChange={() => 
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: 'lowToHigh'
            })
          }
          checked={sort === 'lowToHigh' ? true : false}
          inline
          label='Ascending'
          name='Group 1'
          type='radio'
          id={'inline-1'}
        />
      </span>
      <span>
        <Form.Check 
          onChange={() => 
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: 'highToLow'
            })
          }
          checked={sort === 'highToLow' ? true : false}
          inline
          label='Descending'
          name='Group 1'
          type='radio'
          id={'inline-2'}
        />
      </span>
      <span>
        <Form.Check 
          onChange={() => 
            productDispatch({
              type: 'FILTER_BY_STOCK'
            })
          }
          checked={byStock}
          inline
          label='Include Out Of Stock'
          name='Group 1'
          type='checkbox'
          id={'inline-3'}
        />
      </span>
      <span>
        <Form.Check 
          onChange={() => 
            productDispatch({
              type: 'FILTER_BY_DELIVERY'
            })
          }
          checked={byFastDelivery}
          inline
          label='Fast Delivery Only'
          name='Group 1'
          type='checkbox'
          id={'inline-4'}
        />
      </span>

      <span>
        <label style={{ paddingRight:10 }}>Rating</label>
        {/* onClicking the no. of start the setRate will be updated */}
        <Rating 
          rating={byRating} 
          
          onClick={(i)=>
            productDispatch({
              type: 'FILTER_BY_RATING',
              payload: i+1,
            })
          } 
          style={{cursor:"pointer"}} 
        /> 
      </span>

      <Button 
        onClick={() => {
          productDispatch({
            type: "CLEAR_FILTER"
          })
        }}
       variant='light'>
        Clear Filter
      </Button>
    </div>
  )
}

export default Filters
