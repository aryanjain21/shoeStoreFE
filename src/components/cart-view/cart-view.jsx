import './cart-view.scss';
import Shoe from '../../assets/images/shoe.jpg';
import Delete from '../../assets/icons/delete.svg';
import QtyButton from '../../common/qty-button/qty-button';

const CartView = (props) => {

    return(
        <div className='cart_view_container'>
            <div className='cart_details_section'>
                <div className='product_details'>
                    <div className='product_image'>
                        <img src={Shoe} alt="image" />
                    </div>
                    <div className='details'>
                        <div className='title'>Title</div>
                        <div className='size'>Size</div>
                        <div className='price'>Price</div>
                    </div>
                </div>
                <div className='btn_section'>
                    <div className='qty_btn_section'>
                        <QtyButton />
                    </div>
                    <div className='remove_btn'>
                        <img src={Delete} alt="delete" />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CartView;