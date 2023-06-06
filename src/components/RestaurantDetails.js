import React, { useEffect, useState } from 'react';
import { SWIGGY_RESTAURANT_INFO_API } from '../utils/constants';
import { useParams } from 'react-router-dom';
import RestaurantMinDetails from './RestaurantMinDetails';
import RestaurantMenuTabs from './RestaurantMenuTabs';
import RestaurantDetailsShimmer from './RestaurantDetailsShimmer';

const RestaurantDetails = () => {
  const {restaurantId} =  useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantMenuData, setRestaurantMenuData] = useState(null);
  useEffect(() => {
    fetchRestaurantData();
  }, []);
  const fetchRestaurantData = async () => {
    const data = await fetch(SWIGGY_RESTAURANT_INFO_API + restaurantId);
    const json = await data.json();
    setRestaurantData(json.data?.cards[0]?.card?.card?.info);
    let restaurantMenuData = json.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    restaurantMenuData = restaurantMenuData.filter(
        (res) => res.card?.card?.hasOwnProperty('title')
    );
    setRestaurantMenuData(restaurantMenuData);
  };

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
