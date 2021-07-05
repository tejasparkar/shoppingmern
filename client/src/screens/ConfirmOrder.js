import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message';
import CheckOutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderAction'
import { ORDER_DETAILS_RESET } from '../constants/orderConstants';

const ConfirmOrder = ({history}) => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch()
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate;

    const addDecimal = (num) => {
        return (Math.round((num * 100) / 100).toFixed(2))
    }
    cart.itemsPrice = addDecimal(cart.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    ));
    cart.shippingPrice = addDecimal(cart.cartItems.length > 500 ? 0 : 50)
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)


    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.savePaymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }));
        
    }

    useEffect(()=>{
        if(success) history.push(`/order/${order._id}`)
    },[history,order,success])
    return (
        <div style={{ margin: '2rem' }}>
            <CheckOutSteps step1 step2 step3 />
            <Row >
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Address :</strong>
                                {cart.shippingAddress.address}&nbsp;
                                {cart.shippingAddress.city}&nbsp;
                                {cart.shippingAddress.postalCode}&nbsp;
                                {cart.shippingAddress.country}&nbsp;
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>{cart.savePaymentMethod}</strong></p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (<Message>Your Cart is Empty</Message>) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} X ₹{item.price} = ₹{item.price * item.quantity}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card style={{ margin: "auto", padding: "10px" }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹{cart.itemsPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>₹{cart.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₹{cart.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{cart.totalPrice}</Col>
                                </Row>
                                <ListGroup.Item>{
                                error && <Message variant="danger">{error}</Message>
                                    }</ListGroup.Item>
                            </ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                variant="primary"
                                disabled={cart.cartItems.length === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button>
                        </ListGroup>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ConfirmOrder
