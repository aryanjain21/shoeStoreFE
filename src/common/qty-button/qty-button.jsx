import './qty-button.scss';

const QtyButton = (props) => {

    const { qty=1 } = props;

    return (
        <div className='qty_button_section'>
            <div className='btn_area'>
                <div className='minus_btn'>-</div>
                <div className='qty_count'>{qty}</div>
                <div className='plus_btn'>+</div>
            </div>
        </div>
    );
};

export default QtyButton;