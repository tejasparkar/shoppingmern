import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../actions/productsAction';
import ProcuctScreen from './ProcuctScreen'
import { Row, Col  } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
const Homescreen = () => {

    const dispatch = useDispatch();
    const listProduct = useSelector(state => state.productList);
    const {loading, error, products} = listProduct;
    useEffect(() => {
        dispatch(productList())
    }, [dispatch])
    
    return (
        
        <React.Fragment>
            {
                loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : 
                <Row>
                { products.map((product, index) => (
                    <Col key={index} md="3">
                        <ProcuctScreen product={product} />
                    </Col>
                ))}
            </Row>
            }
           
        </React.Fragment>
    )
}

export default Homescreen
