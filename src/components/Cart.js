import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import { Button, ListGroup, Row, Col, Form, Image } from 'react-bootstrap';
import Rating from './Rating'
import './homeStyle.css'
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Cart = () => {

  const {
    state: {cart},
    dispatch
  } = CartState();

  // getting total amount
  const [ totalAmount, setTotalAmount ] = useState(0);
  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc+Number(curr.price)*curr.qty, 0))
  }, [cart])


  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {
            cart.map(prod => (
              <ListGroup.Item key={prod.id}>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>
                    $ {prod.price}
                  </Col>
                  <Col md={2}>
                    <Rating rating={prod.ratings} />
                  </Col>
                  <Col md={2}> 
                    <Form.Control as='select' value={prod.qty}
                      onChange={(e) => {
                        dispatch({
                          type: 'CHANGE_CART_QTY',
                          payload: {
                            id: prod.id,
                            qty: e.target.value,
                          }
                        })
                      }}
                    >
                      {
                        [...Array(prod.inStock).keys()].map((x) => (
                          <option key={x+1}> {x + 1} </option>
                        ))
                      }
                    </Form.Control>
                  </Col>
                  
                  <Col>
                    <Button variant='danger' 
                      type='button' 
                      onClick={() => {
                        dispatch({
                          type: 'REMOVE_FROM_CART',
                          payload: prod,
                        })
                      }}>
                      <AiFillDelete fontSize='25px' />
                    </Button>
                  </Col>

                </Row>
              </ListGroup.Item>
            )) 
          }
        </ListGroup>
      </div>

      {/* cart page sidebar, it will have price and other details */}
      <div className="filters summary">
        <span className='title'>
          Subtotal of {cart.length} items
        </span>
        <span>
          Total : ${totalAmount}
        </span>

        <Link to='/'>
          <Button type='button' variant='success' disabled={cart.length === 0} >
            Continue shopping
          </Button>
        </Link>
        
        <Link to='/order'>
          <Button type='button' variant='warning' disabled={cart.length === 0} >
            Place order
          </Button>
        </Link>

      </div>
    </div>
  )
}

export default Cart
