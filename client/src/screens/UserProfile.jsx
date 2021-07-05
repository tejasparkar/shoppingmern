import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { getMyOrders } from "../actions/orderAction";
import { ORDER_DETAILS_RESET } from "../constants/orderConstants";
const UserProfle = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);

  const { success } = userProfileUpdate;
  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: orderError } = myOrderList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };
  return (
    <>
      <Row style={{ margin: "2%" }}>
        <Col md={3}>
          <h1>Update Information</h1>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader></Loader>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmpassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button
                type="submit"
                style={{ margin: "1rem" }}
                variant="primary"
              >
                Update
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={9}>
          <h1>My Orders</h1>
          {loadingOrders ? (
            <Loader />
          ) : orderError ? (
            <Message variant="danger">{orderError}</Message>
          ) : (
            <Table stripped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>DATE</td>
                  <td>TOTAL</td>
                  <td>PAID</td>
                  <td>DELIVERED</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    style={{ alignItems: "center", textAlign: "center" }}
                    key={index}
                  >
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td> ₹{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <i
                          style={{ color: "green" }}
                          className="fas fa-check"
                        ></i>
                      ) : (
                        <i
                          style={{ color: "red" }}
                          className="fas fa-times"
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <i
                          style={{ color: "green" }}
                          className="fas fa-check"
                        ></i>
                      ) : (
                        <i
                          style={{ color: "red" }}
                          className="fas fa-times"
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button
                          onClick={dispatch({ type: ORDER_DETAILS_RESET })}
                          variant="light"
                        >
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserProfle;
