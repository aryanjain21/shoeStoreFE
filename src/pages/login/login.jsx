import './login.scss';
import LoginForm from "../../components/login-form/login-form";
import {connect} from 'react-redux';
import { fetchUserDetails } from '../../redux/user/user-action';

const Login = (props) => {
    
    return(
        <div className='login_container'>
            <LoginForm {...props} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userDate: state.user,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserDetails: (data) => dispatch(fetchUserDetails(data)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);