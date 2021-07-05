import { SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS, SINGLE_PRODUCT_FAILURE } from '../constants/productContstants'
import axios from 'axios'
export const singleProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_PRODUCT_REQUEST })
        const { data } = await axios.get(`http://localhost:8080/api/product/${id}`);
        dispatch({
            type: SINGLE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
