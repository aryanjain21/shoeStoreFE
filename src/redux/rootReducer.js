import { combineReducers } from 'redux';
import UserReducer from './user/user-reducer';
import ProductReducer from './product/reducer';
import AddressReducer from './address/reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  product: ProductReducer,
  addressList: AddressReducer
})

export default rootReducer;