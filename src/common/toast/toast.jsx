import { useEffect, useState } from 'react';
import './toast.scss';

const Toast = (props) => {

    const { msg } = props;

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    });

    return (
        <div className='toast_container'>
            <div className='msg_section'>
                <div className='msg'>{msg}</div>
            </div>
        </div>
    );
};

export default Toast;