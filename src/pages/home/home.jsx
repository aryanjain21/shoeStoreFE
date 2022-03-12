import './home.scss';
import ProductCard from '../../common/product-card/product-card';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProductList } from '../../redux/product/action.js';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Banner_1 from '../../assets/images/banner_1.jpg';
import Banner_2 from '../../assets/images/banner_2.jpg';
import Banner_3 from '../../assets/images/banner_3.jpg';
import MenFootwear from '../../assets/images/men_footwear.webp';
import WomenFootwear from '../../assets/images/women_footwear.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../assets/icons/loader.gif';

const Home = (props) => {

    const { productData, fetchProductList } = props;
    let maleCount = 0, femaleCount = 0;

    const navigate = useNavigate();

    const [productDataList, setProductDataList] = useState([]);

    useEffect(() => {
        let homeProduct = [];
        if (productData?.product?.products?.length) {
            productData?.product?.products?.forEach((element, index) => {
                if (element.gender === 'Male' && maleCount < 3) {
                    homeProduct.push(element);
                    maleCount++;
                } else if (element.gender === 'Female' && femaleCount < 3) {
                    homeProduct.push(element);
                    femaleCount++;
                }
                setProductDataList(homeProduct);
            });
        }
        // eslint-disable-next-line
    }, [productData])


    useEffect(() => {
        fetchProductList();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='home_container'>
            <Carousel infiniteLoop autoPlay>
                <div className='banner_section'>
                    <img src={Banner_1} alt="banner 1" />
                </div>
                <div className='banner_section'>
                    <img src={Banner_2} alt="banner 2" />
                </div>
                <div className='banner_section'>
                    <img src={Banner_3} alt="banner 3" />
                </div>
            </Carousel>
            <div className='promotion_section'>
                <div className='promotion_image'>
                    <img src={MenFootwear} alt="men footwear promotion" />
                </div>
                <div className='promotion_txt'>
                    Buying the right footwear is of utmost significance to walk and run the right way wherever we go from trekking to an outing with friends. Our impressive collection of men’s footwear has a variety of options. Choose the right type of men’s shoe that is made from the material and color of your choice, which fits you perfectly well at the same time.
                </div>
            </div>
            <div className='promotion_section second_promotion_section'>
                <div className='promotion_image'>
                    <img src={WomenFootwear} alt="men footwear promotion" />
                </div>
                <div className='promotion_txt'>
                    There are women’s shoes for various occasions, from weddings to workouts and dates to office dinners. The assortment of women’s footwear features different styles of formal, casual, party, wedding, ethnic and sports shoes. In addition, this massive selection offers sandals, ballerinas, pumps, loafers, peep toes, sneakers, boots, and ethnic shoes with different types of heels. When it comes to women’s shoes the options are truly endless.
                </div>
            </div>
            <div className='product_list'>
                <div className='link_section'>
                    <span className='link' onClick={() => navigate(`/product`)}>View All</span>
                </div>
                {productData.loader ?
                    <div className='loader'>
                        <img src={Loader} alt="Loading..." />
                    </div>
                    :
                    <ProductCard hidebtn={true} products={productDataList.length ? productDataList : []} />
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        productData: state.product,
        loader: state.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProductList: (data) => dispatch(fetchProductList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);