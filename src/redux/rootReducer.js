import { combineReducers } from 'redux';
import UserReducer from './user/user-reducer';
import ProductReducer from './product/reducer';
import AddressReducer from './address/reducer';
import CartReducer from './cart/reducer';
import WishlistReducer from './wishlist/reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  product: ProductReducer,
  addressList: AddressReducer,
  cartList: CartReducer,
  wishlist: WishlistReducer
})

export default rootReducer;