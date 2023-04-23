import React from 'react';
import './homeStyle.css';
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'  
import { Container, Navbar, FormControl, Dropdown, Badge, Nav } from 'react-bootstrap'
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import { Button } from 'react-bootstrap'

const Header = () => {

  const {
    state: {cart},
    dispatch,
    productDispatch
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping-Cart</Link>
        </Navbar.Brand>

        <Navbar.Text className="search">
          <FormControl
            placeholder="search products"
            style={{ width: 500 }}
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: 'FILTER_BY_SEARCH',
                payload: e.target.value
              })
            }}
          />
        </Navbar.Text>

        <Nav>
          <Dropdown>
            <Dropdown.Toggle>
              <FaShoppingCart color='white' fontSize='25px' />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {
                    cart.map((prod) => (
                      <span className='cartItem' key={prod.id}>
                          <img src={prod.image} 
                          alt={prod.name}
                          className='cartItemImg' 
                        />
                        <div className='cartItemDetail'>
                          <span>{prod.name}</span>
                          <span>$ {prod.price}</span>
                        </div>

                        <AiFillDelete 
                          fontSize='20px'
                          style={{cursor:'pointer'}}
                          onClick={() => {
                            dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: prod
                            })
                          }}
                        />
                      </span>
                    ))
                  }

                  <Link to='/cart'>
                    <Button style={{width:'95%', margin:'0 12px'}}>
                      Go to Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span>Cart is Empty</span>
              ) }

            </Dropdown.Menu>  
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header
