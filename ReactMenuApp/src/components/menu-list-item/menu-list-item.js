import React from 'react';
import './menu-list-item.scss';
import {Link} from 'react-router-dom'

const MenuListItem = ({menuItem, onAddToCart}) => {
    const {title, price, url, category} = menuItem;

    let iconUrl = ''
    if (category === 'salads') {
        iconUrl = 'https://image.flaticon.com/icons/png/512/129/129187.png'
    } else if (category === 'pizza') {
        iconUrl = 'https://cdn1.iconfinder.com/data/icons/birthday-30/64/pizza_food_slice_piece_fast_-512.png'
    } else if (category === 'meat') {
        iconUrl = 'https://freeiconshop.com/wp-content/uploads/edd/meat-outline-filled.png'
    }

    return (
            <li className="menu__item">
                <Link to={`${menuItem.id}`}>
                    <div className="menu__title">{title}</div>
                    <div className="container">
                        <img className="menu__img" src={url} alt={title}></img>
                        <div className="bottom-left"><img className="icon" src={iconUrl}></img></div>
                    </div>
                    <div className="menu__category">Category: <span>{category}</span></div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                </Link>
                    <button onClick={() => onAddToCart()} className="menu__btn">Add to cart</button>
            </li>

    )
}

export default MenuListItem;