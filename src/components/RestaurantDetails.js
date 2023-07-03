import React from 'react';
import { useParams } from 'react-router-dom';
import RestaurantMinDetails from './RestaurantMinDetails';
import RestaurantMenuTabs from './RestaurantMenuTabs';
import RestaurantDetailsShimmer from './RestaurantDetailsShimmer';
import useRestaurantMenu from '../utils/useRestaurantMenu';

const RestaurantDetails = () => {
  const {restaurantId} =  useParams();
  const restaurantDetails = useRestaurantMenu(restaurantId);
  const restaurantData = restaurantDetails[0];
  const restaurantMenuData = restaurantDetails[1];

  return (!restaurantData) ? <RestaurantDetailsShimmer /> : (
    <div className='restaurant-details-container'>
        {(restaurantData) && <RestaurantMinDetails key={'min-det-' + Math.random()} restaurantData={restaurantData} />}
        <div className='restaurant-menu-filter'>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
            </label>
        </div>
        {(restaurantMenuData) && <RestaurantMenuTabs  key={'res-tab-' + Math.random()} restaurantMenuData={restaurantMenuData} />}
    </div>
  );
};

export default RestaurantDetails;
