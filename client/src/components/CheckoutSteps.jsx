import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active={step1 ? false : true} linkAs={Link} linkProps={{ to: "/login" }} >SignIn</Breadcrumb.Item>
        <Breadcrumb.Item active={step2 ? false : true} linkAs={Link} linkProps={{ to: "/shipping" }}>Shipping Address</Breadcrumb.Item>
        <Breadcrumb.Item active={step3 ? false : true} linkAs={Link} linkProps={{ to: "/payment" }}>Payment Method</Breadcrumb.Item>
        <Breadcrumb.Item active={step4 ? false : true} linkAs={Link} linkProps={{ to: "/confirmorder" }}>Confirm Order</Breadcrumb.Item>
  
      </Breadcrumb>
    </>
  );
};

export default CheckoutSteps;
