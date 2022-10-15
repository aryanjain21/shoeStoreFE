import { combineReducers } from 'redux';
import UserReducer from './user/user-reducer';
import ProductReducer from './product/reducer';
import AddressReducer from './address/reducer';
import CartReducer from './cart/reducer';
import WishlistReducer from './wishlist/reducer';
import OrderReducer from './order/reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  product: ProductReducer,
  addressList: AddressReducer,
  cartList: CartReducer,
  wishlist: WishlistReducer,
  order: OrderReducer,
})

export default rootReducer;