import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';
import VEG from "../../images/veg-48.png";
import NONVEG from "../../images/non-veg-48.png";

const RestaurantMenuItem = ({itemCards}) => {
  return ( (itemCards) &&
    itemCards.map((item) => {
        const {name, id, price, imageId, itemAttribute, description, defaultPrice} = item?.card?.info;
        return (
            <div key={id} className='menu-items'>
                <div className='item-name-details'>
                    <div className='item-type'>{(itemAttribute?.vegClassifier === 'VEG') ? <img src={VEG} alt={itemAttribute?.vegClassifier} className='item-type-icon' /> : <img src={NONVEG} alt={itemAttribute?.vegClassifier} className='item-type-icon'/>}</div>
                    <div className='item-name'>{name}</div>
                    <div className='item-price'>Rs. {(price) ? price/100 : defaultPrice/100}</div>
                    {(description) && <div className='item-description'><p>{description}</p></div>}
                </div>
                <div className='item-add'>
                    {(imageId) && <img src={IMG_CDN_URL + imageId} alt={name} className='menu-item-image'/>}
                    <button className='add-button'>Add</button>
                </div>
            </div>
        )
    })
  )
}

export default RestaurantMenuItem;
