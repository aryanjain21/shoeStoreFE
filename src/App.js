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
import { signin } from './redux/user/user-action';

let userInfo = JSON.parse(localStorage.getItem('setUser'));
if (userInfo && userInfo.token) {
  store.dispatch(signin(userInfo));
}

function App() {
  return (
    <Provider store={store}>
      <div className='main_container'>
        <Header />
        <div className='sub_container'>
          <Routes>
            <Route exact path='/' element={<Navigate to='/home' />} />
            <Route exact path='home' element={<Home />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path='signup' element={<SignUp />} />
            <Route exact path='address' element={
              <PrivateRoute>
                <Address />
              </PrivateRoute>
            } />
            <Route exact path='cart' element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } />
            <Route exact path='*' element={<Fallback />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
