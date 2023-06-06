import React from 'react'
import RestaurantMenuTabs from './RestaurantMenuTabs'

const RestaurantItemCategories = ({categories}) => {
  return ( (categories) &&
    <RestaurantMenuTabs restaurantMenuData={categories} />
  )
}

export default RestaurantItemCategories;
