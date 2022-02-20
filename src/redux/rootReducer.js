import { combineReducers } from 'redux';
import UserReducer from './user/user-reducer';
import ProductReducer from './product/reducer';
import AddressReducer from './address/reducer';
import CartReducer from './cart/reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  product: ProductReducer,
  addressList: AddressReducer,
  cartList: CartReducer
})

export default rootReducer;