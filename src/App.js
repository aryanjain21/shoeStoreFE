import { Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'
import './config/axiosConfig';
import './app.scss';
import Header from './components/header/header';
import Home from './pages/home/home';
import Fallback from './pages/fallback/fallback';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import Address from './pages/address/address';
import store from './redux/store.js';
import PrivateRoute from './privateRoute';
import Cart from './pages/cart/cart';
import Product from './pages/product/product';
import ProductInfo from './pages/product-info/product-info';
import Wishlist from './pages/wishlist/wishlist';
import ChangePassword from './pages/change-password/change-password';
import Footer from './components/footer/footer';
import { signin } from './redux/user/user-action';
import Payment from './pages/payment/payment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderConfirmation from './pages/orderConfirmation/orderConfirmation';

let userInfo = JSON.parse(localStorage.getItem('setUser'));
if (userInfo && userInfo.token) {
  store.dispatch(signin(userInfo));
}

function App() {
  return (
    <Provider store={store}>
      <div className='main_container'>
        <div className='header'>
        <Header />
        </div>
        <ToastContainer />
        <div className='sub_container'>
          <Routes>
            <Route exact path='/' element={<Navigate to='/home' />} />
            <Route exact path='home' element={<Home />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path='signup' element={<SignUp />} />
            <Route exact path='/product' element={<Product />} />
            <Route exact path='/buy/:productId' element={
              <PrivateRoute>
                <ProductInfo />
              </PrivateRoute>
            } />
            <Route exact path='/address' element={
              <PrivateRoute>
                <Address />
              </PrivateRoute>
            } />
            <Route exact path='cart' element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } />
            <Route exact path='wishlist' element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            } />
            <Route exact path='change-password' element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            } />
            <Route exact path='payment' element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            } />
            <Route exact path='/order-status/:orderId' element={
              <PrivateRoute>
                <OrderConfirmation />
              </PrivateRoute>
            } />
            <Route exact path='*' element={<Fallback />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
