import React from 'react';

const RestaurantMinDetails = ({restaurantData}) => {
  const {name, cuisines, totalRatingsString, avgRating, areaName, costForTwoMessage, sla} = restaurantData;
  return (
    <>
        <div className='restaurant-min-details'>
          <div className='restaurant-name'>
              <h2>{name}</h2>
              <h4>{cuisines.join(', ')}</h4>
              <h4>{areaName}{(sla?.lastMileTravelString) ? ',' + sla?.lastMileTravelString : ''}</h4>
          </div>
          <div className='rating'>
            <span className='rating-stars'>{avgRating}</span>
            <span className='rating-count'>{totalRatingsString}</span>
          </div>
        </div>
        <div className='restaurant-delivery-details'>
            <span>{sla?.slaString}</span>
            <span>{costForTwoMessage}</span>
        </div>
    </>
  );
}

export default RestaurantMinDetails;
