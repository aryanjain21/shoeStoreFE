import './filter.scss';
import Checked from '../../assets/icons/checked.svg';
import Unchecked from '../../assets/icons/unchecked.svg';
import RadioChecked from '../../assets/icons/radio_checked.svg';
import RadioUnchecked from '../../assets/icons/radio_unchecked.svg';
import { useState } from 'react';

const Filter = (props) => {

    const { filterOption = [], fetchProductList } = props;
    const [open, setOpen] = useState(false);
    const [radio, setRadio] = useState(false);
    const [priceRadio, setPriceRadio] = useState(false);
    const [filterKey, setFilterKey] = useState('');
    const [priceVal, setPriceVal] = useState('');
    const [filter, setFilter] = useState({ brands: [], gender: [], size: '', price: '' });

    
    let gender = ['Male', 'Female'];
    let price = ['High to Low', 'Low to High'];
    let size = ['3', '4', '5', '6', '7', '8', '9', '10', '11'];
    let brands = ['NIKE','Campus', 'ADIDAS', 'BATA','TRASE','Roadster', 'BXXY'];

    const handleFilterOption = (key) => {
        if (key === filterKey) {
            setOpen(false);
            setFilterKey('');
        } else {
            setOpen(true)
            setFilterKey(key);
        }
    }

    const getFilterProducts = (filter) => {
        fetchProductList({ filter: filter });
    }

    const handleGender = (gender) => {
        let value = {
            brands: filter.brands,
            gender: !filter.gender.includes(gender) ? [...filter.gender, gender] : filter.gender.filter(g => g !== gender),
            size: filter.size,
            price: filter.price,
        }
        setFilter(value);
        getFilterProducts(value);
    }

    const handlePrice = (price) => {
        let value = {
            brands: filter.brands,
            gender: filter.gender,
            size: filter.size,
            price: price === 'High to Low' ? -1 : 1,
        }
        if (!priceRadio) {
            setFilter(value);
            setPriceVal(price);
            setPriceRadio(true);
        } else if (priceRadio && filter.price != price) {
            setFilter(value);
            setPriceVal(price);
        }
        getFilterProducts(value);
    }

    const handleSize = (size) => {
        let value = {
            brands: filter.brands,
            gender: filter.gender,
            size: size,
            price: filter.price,
        }
        if (!radio) {
            setFilter(value);
            setRadio(true);
        } else if (radio && filter.size != size) {
            setFilter(value);
        }
        getFilterProducts(value);
    }

    const handleBrands = (brand) => {
        let value = {
            brands: !filter.brands.includes(brand) ? [...filter.brands, brand] : filter.brands.filter(b => b !== brand),
            gender: filter.gender,
            size: size,
            price: filter.price,
        }
        setFilter(value);
        getFilterProducts(value);
    }

    const clearFilter = () => {
        setFilter({ brands: [], gender: [], price: '', range: [] })
        localStorage.removeItem('filter')
        fetchProductList();
    }

    return (
        <>
            <div className='filter_header'>
                <div className='heading'>Filter</div>
                <div className='clear_link' onClick={clearFilter}>Clear Filter</div>
            </div>
            {filterOption.map((element, index) => {
                return <div className='filter_container' key={index}>
                    {element.key === 'gender' && <>
                        <div className='title_section' onClick={() => handleFilterOption(element.key)}>
                            <div className='title'>{element.key.toUpperCase()}</div>
                            <div className='icon'>{(open && filterKey === 'gender') ? '-' : '+'}</div>
                        </div>
                        {filterKey === 'gender' && gender.map((gen, index) => (
                            <div className='filter_values' onClick={() => { handleGender(gen) }} key={index}>
                                <div className='checkbox'>
                                    <img src={(filter.gender.includes(gen) ? true : false) ? Checked : Unchecked} alt="" />
                                </div>
                                <div className='options'>
                                    {gen}
                                </div>
                            </div>))
                        }
                    </>
                    }
                    {element.key === 'size' && <>
                        <div className='title_section' onClick={() => handleFilterOption(element.key)}>
                            <div className='title'>{element.key.toUpperCase()}</div>
                            <div className='icon'>{(open && filterKey === 'size') ? '-' : '+'}</div>
                        </div>
                        {filterKey === 'size' && size.map((sizeOpt, index) => (<div className='filter_values' onClick={() => handleSize(sizeOpt)} key={index}>
                            <div className='checkbox'>
                                <img src={(radio && filter.size === sizeOpt) ? RadioChecked : RadioUnchecked} alt="" />
                            </div>
                            <div className='options'>
                                {sizeOpt}
                            </div>
                        </div>))}
                    </>}
                    {element.key === 'brands' && <>
                        <div className='title_section' onClick={() => handleFilterOption(element.key)}>
                            <div className='title'>{element.key.toUpperCase()}</div>
                            <div className='icon'>{(open && filterKey === 'brands') ? '-' : '+'}</div>
                        </div>
                        {filterKey === 'brands' && brands.map((brandOpt, index) => (
                            <div className='filter_values' onClick={() => { handleBrands(brandOpt) }} key={index}>
                                <div className='checkbox'>
                                    <img src={(filter.brands.includes(brandOpt) ? true : false) ? Checked : Unchecked} alt="" />
                                </div>
                                <div className='options'>
                                    {brandOpt}
                                </div>
                            </div>))
                        }
                    </>}
                    {element.key === 'price' && <>
                        <div className='title_section' onClick={() => handleFilterOption(element.key)}>
                            <div className='title'>{element.key.toUpperCase()}</div>
                            <div className='icon'>{(open && filterKey === 'size') ? '-' : '+'}</div>
                        </div>
                        {filterKey === 'price' && price.map((priceOpt, index) => (<div className='filter_values' onClick={() => handlePrice(priceOpt)} key={index}>
                            <div className='checkbox'>
                                <img src={(priceRadio && priceVal === priceOpt) ? RadioChecked : RadioUnchecked} alt="" />
                            </div>
                            <div className='options'>
                                {priceOpt}
                            </div>
                        </div>))}
                    </>}
                </div>
            })}
        </>
    );
};

export default Filter;