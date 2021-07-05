import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import productListReducer from './reducers/productReducer'
import singleProductReducer from './reducers/singleProductReducer'
import cartReducer from './reducers/cartReducer';
import { orderCreateReducer , orderDetailsReducer , orderPaidReducer , ordersListReducer} from './reducers/orderReducer'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, updateUserProfileReducer  } from './reducers/userReducer'

const cartItemsFromStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : []
const reducer = combineReducers({
    productList: productListReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: updateUserProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPaid : orderPaidReducer,
    myOrderList : ordersListReducer,
});
const initialState = {
    // cart : {cartItems : 'tech'}
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;