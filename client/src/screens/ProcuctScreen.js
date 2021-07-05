import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom'
const ProcuctScreen = ({ product }) => {
    return (
        <React.Fragment>
            <Card className="my-3 p-3 rounded">
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant="top" />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as="div">
                            <h4 style={{ fontWeight: "900" }}>{product.name}</h4>
                        </Card.Title>
                    </Link>
                    <Card.Text as="div">
                        <Rating value={product.ratings} text={`${product.noOfReviews} reviews`} />
                    </Card.Text>
                    <Card.Text>
                        <strong>₹ {product.price}</strong>
                    </Card.Text>
                </Card.Body>

            </Card>
        </React.Fragment>
    )
}

export default ProcuctScreen
