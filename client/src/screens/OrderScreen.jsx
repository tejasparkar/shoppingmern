import React, { useState, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import {  ORDER_DETAILS_RESET, ORDER_PAY_RESET } from "../constants/orderConstants";
import { Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import axios from "axios";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [sdkReady, setsdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPaid = useSelector((state) => state.orderPaid);
  const { loading: loadingPay, success: successPay } = orderPaid;
  if (!loading) {
    const addDecimal = (num) => {
      return Math.round((num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimal(
      order.orderItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      )
    );
    order.shippingPrice = addDecimal(order.orderItems.length > 500 ? 0 : 50);
    order.taxPrice = addDecimal(Number((0.15 * order.itemsPrice).toFixed(2)));
    order.totalPrice =
      Number(order.itemsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice);
  }

  useEffect(() => {
    
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        `http://localhost:8080/api/config/paypal`
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setsdkReady(true);
      };
      document.body.appendChild(script);

    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DETAILS_RESET })
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      
      if (!Window.paypal) {
        addPaypalScript();
      } else {
        setsdkReady(true);
      }
    }
  }, [match.params.id, dispatch, order, successPay, orderId]);

  const successHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
    
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container style={{ margin: "2%" }}>
          <h1>Order:{order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup.Item variant="flush">
                <h2>Shipping</h2>
                <p>
                  <strong>Name :</strong> {order.user.name}
                </p>
                <p>
                  <strong>Email :</strong> {order.user.email}
                </p>
                <p>
                  <strong>Address :</strong>
                  {order.shippingAddress.address}&nbsp;
                  {order.shippingAddress.city}&nbsp;
                  {order.shippingAddress.postalCode}&nbsp;
                  {order.shippingAddress.country}&nbsp;
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Paid On {order.isDelivered}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>{order.paymentMethod}</strong>
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid On {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Your Cart is Empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.quantity} X ₹{item.price} = ₹
                            {item.price * item.quantity}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </Col>
            <Col md={4}>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹ {order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successHandler}
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default OrderScreen;
