import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import Message from "../components/Message";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";

const Cart = ({ match, location, history }) => {
  // const productId = match.params.id;
  // const quantity = location.search ? location.search.split('=')[1] : 1
  const dispatch = useDispatch();

  // useEffect(()=>{
  // dispatch(addToCart(productId,quantity))
  // },[dispatch,productId,quantity,match]);
  //   const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkout = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Cart</h1>
          <Row
            style={{
              alignItems: "start",
              textAlign: "center",
              margin: "auto",
            }}
          >
            <Col md={3}>
              <h5>Image</h5>
            </Col>
            <Col md={4}>
              <h5>Name</h5>
            </Col>
            <Col md={3}>
              <h5>Price</h5>
            </Col>
            <Col md={2}>
              <h5>Quantity</h5>
            </Col>
          </Row>

          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty !<Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col
                      md={3}
                      style={{
                        alignItems: "start",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid="true"
                        rounded
                      ></Image>
                    </Col>
                    <Col
                      md={3}
                      style={{
                        alignItems: "start",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <Link to={`/product/${item.product}`}>
                        <h4>{item.name}</h4>
                      </Link>
                    </Col>
                    <Col
                      style={{
                        alignItems: "start",
                        textAlign: "center",
                        margin: "auto",
                      }}
                      md={3}
                    >
                      <h4>₹ {item.price}</h4>
                    </Col>
                    <Col
                      md={2}
                      style={{
                        alignItems: "start",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <Form.Control
                        style={{
                          alignItems: "start",
                          textAlign: "center",
                          margin: "auto",
                        }}
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((index) => (
                          <option
                            style={{
                              alignItems: "start",
                              textAlign: "center",
                              margin: "auto",
                            }}
                            key={index + 1}
                            value={index + 1}
                          >
                            {index + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col
                      style={{
                        alignItems: "start",
                        textAlign: "center",
                        margin: "auto",
                      }}
                      md={1}
                    >
                      <Button
                        onClick={() => removeFromCartHandler(item.product)}
                        variant="danger"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col style={{ marginTop: "2%" }} md={4}>
          <Card style={{ margin: "auto", padding: "10px" }}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>
                  subTotal (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  items
                </h3>
                <h3>
                  Price : ₹
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </h3>
              </ListGroupItem>
              <Button
                type="button"
                onClick={checkout}
                className="block"
                disabled={cartItems.length === 0}
              >
                Proceed to CheckOut
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
