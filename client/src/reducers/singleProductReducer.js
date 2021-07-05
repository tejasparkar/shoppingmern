import { SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS, SINGLE_PRODUCT_FAILURE } from '../constants/productContstants'

const singleProductReducer = (state = { product: {reviews : []} }, action) => {
    switch (action.type) {  
        case SINGLE_PRODUCT_REQUEST:
            return { loading: true, ...state };
        case SINGLE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload };
        case SINGLE_PRODUCT_FAILURE:
            return { loading: false, error: action.payload };
        default: return state;
    }


}
export default singleProductReducer;