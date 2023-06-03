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
            <h3>{name}</h3>
            <h4>{cuisines.join()}</h4>
            <h5>{avgRating}</h5>
            <h6>{costForTwoString}</h6>
            <h6>{slaString}</h6>
        </div>
    );
};

export default RestaurantCard;
