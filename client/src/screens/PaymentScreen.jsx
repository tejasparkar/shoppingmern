import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push("/shipping");
  }
  const [paymentOption, setPaymentOption] = useState("paypal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentOption));
    
    history.push("/confirmorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="paypal or credit card"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              
              onChange={(e) => setPaymentOption(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="stripe"
              id="Stripe"
              name="paymentMethod"
              value="stripe"
              
              onChange={(e) => setPaymentOption(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button style={{ margin: "1rem" }} type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
