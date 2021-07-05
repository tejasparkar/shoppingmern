import React, { useState, useEffect } from "react";
import { singleProduct } from "../actions/productAction";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { addToCart } from "../actions/cartAction";
const ProductDetails = ({history, match }) => {
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.singleProduct);
  const { loading, error, product } = Product;

  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = ()=>{
    dispatch(addToCart(product._id,quantity))
    history.push(`/cart`)
  }

  useEffect(() => {
    dispatch(singleProduct(match.params.id));
  }, [match.params.id, dispatch]);
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link className="btn btn-outline-dark m-1" to="/">
            <i className="fas fa-arrow-left"></i> &nbsp;Go Back
          </Link>
          <Row className="py-4 m-3">
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.ratings}
                    text={`${product.noOfReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <h4> Price: ₹{product.price}</h4>
                </ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem>
                <Row>
                  <Col> Status : </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col style={{textAlign :'center', marginTop:'5%'}}> Quantity : </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map(
                          (index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem className="d-grid gap-2">
                <Button className="btn btn-primary" onClick={addToCartHandler} type="button">
                  <i className="fas fa-shopping-cart"></i> &nbsp;Add to Cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </>
      )}
    </React.Fragment>
  );
};

export default ProductDetails;
