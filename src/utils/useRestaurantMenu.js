import { useEffect, useState } from "react";
import { SWIGGY_RESTAURANT_INFO_API } from "./constants";

const useRestaurantMenu = (restaurantId) => {
    const [restaurantMenuData, setRestaurantMenuData] = useState(null);
    const [restaurantData, setRestaurantData] = useState(null);

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
  return [
        restaurantData, 
        restaurantMenuData,
    ];
};

export default useRestaurantMenu;
