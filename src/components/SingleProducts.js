import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating';
import './homeStyle.css';
import { CartState } from '../context/Context';

const SingleProducts = ({ prod }) => {
  
  const {
    state: {cart},
    dispatch,
  } = CartState();
  
  return (
    <div className='products'>
      <Card>
        <Card.Img className='prod-image' variant='top' src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{paddingBottom:10}}>
            <span>${prod.price}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days Delivery</div>
            )}
            <Rating rating={prod.ratings} />
          </Card.Subtitle>

          {/* add and remove button for cart */}
          {/* some helps us to check if something exixts in the array */}
          {
            cart.some(p=>p.id === prod.id) ? (
              <Button variant='danger'
                onClick={() => {
                  dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: prod
                  })
                }}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button variant='success' 
                disabled={prod.inStock===0}
                onClick={() => {
                  dispatch({
                    type: 'ADD_TO_CART',
                    payload: prod
                  })
                }} 
              >
                {prod.inStock===0 ? 'Out of Stock' : 'Add to cart'}
              </Button>
            ) 
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProducts
