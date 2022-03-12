import './fallback.scss';
import FallbackError from '../../assets/images/fallback.jpg';
import Button from '../../common/button/button';
import { useNavigate } from 'react-router-dom';

const Fallback = () => {

    const navigate = useNavigate();

    return(
        <div className="fallback_container">
            <img src={FallbackError} alt="fallback" />
            <div className='info_txt'>
                <div className='txt'>Something went wrong...</div>
                <Button clickHandler={() => navigate('/home')}>Go Back to Home</Button>
            </div>
        </div>
    )
};

export default Fallback;