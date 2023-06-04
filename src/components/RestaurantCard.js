import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

const RestaurantCard = ({restaurantData}) => {
    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwoString,
        slaString
    } = restaurantData?.data;
    return (
        <div className="restaurant-card">
            <img src={ IMG_CDN_URL + cloudinaryImageId} alt={name} className="restaurant-image" />
            <div className='restaurant-info'>
                <span className='restaurant-name'>{name}</span>
                <span className='restaurant-cuisines'>{cuisines.join(', ')}</span>
                <ul>
                    <li className={(avgRating > 4) ? 'restaurant-rating' : (avgRating > 3) ? 'restaurant-rating-wran' : 'restaurant-rating-error' }>
                        {/* <span className='star'>★</span> */}
                        <span className='rating-text'>{avgRating}</span>
                    </li>
                    <li className='restaurant-dot'>.</li>
                    <li className='restaurant-delivery-time'>{slaString}</li>
                    <li className='restaurant-dot'>.</li>
                    <li className='restaurant-cost'>{costForTwoString}</li>
                </ul>
            </div>
        </div>
    );
};

export default RestaurantCard;
