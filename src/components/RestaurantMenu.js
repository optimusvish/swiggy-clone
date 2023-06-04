import {useEffect, useState} from 'react';
import { IMG_CDN_URL, SWIGGY_RESTAURANT_INFO_API } from '../utils/constants';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';

const RestaurantMenu = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantMenuData, setRestaurantMenuData] = useState(null);
  const [restaurantRecMenuData, setRestaurantRecMenuData] = useState(null);
  const {restaurantId} =  useParams(); 

  useEffect(() => {
    fetchRestaurantData();
  }, []); 

  const fetchRestaurantData = async () => {
    const data = await fetch(SWIGGY_RESTAURANT_INFO_API + restaurantId);
    const json = await data.json();
    const restaurantMenuData = json.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    let recommendedMenuData = restaurantMenuData.filter(
        (res) => res.card?.card?.type?.includes('CATEGORY_TYPE_RECOMMENDED')
    );

    if (recommendedMenuData.length === 0) {
        recommendedMenuData = [restaurantMenuData[1]];
    }

    setRestaurantData(json.data?.cards[0]?.card?.card?.info);
    setRestaurantMenuData(restaurantMenuData);
    setRestaurantRecMenuData(recommendedMenuData);
    //console.log(restaurantMenuData, recommendedMenuData);
  };

  if(!restaurantData && !restaurantMenuData) {
    return <Shimmer />;
  }

  const {name, city, cloudinaryImageId, costForTwoMessage, cuisines, avgRating} = restaurantData;

  const {title, itemCards} = restaurantRecMenuData[0]?.card?.card;

  return (
    <div className='restaurant-info-container'>
        <div className='restaurant-details'>
            <img src={IMG_CDN_URL + cloudinaryImageId} alt={name} className='restaurant-image' />
            <h1>{name}</h1>
            <h2>{cuisines.join()}</h2>
            <h3>{costForTwoMessage}</h3>
            <h4>{city}</h4>
            <h5>Rating: {avgRating}</h5>
        </div>
        <div className='restaurant-menu'>
            <h1>Menu</h1>
            <div className='sub-menu'>
                <h3>{title}</h3>
                <ul>
                    {
                        itemCards?.map((menuItem)=>{
                            return (
                                <li 
                                    key={menuItem.card?.info?.id}
                                >
                                    <span className='item-name'>{menuItem.card?.info?.name}</span>
                                    <span className='item-price'>Rs.: {(menuItem.card?.info?.price) ? (menuItem.card?.info?.price)/100 + "/-" : (menuItem.card?.info?.defaultPrice)/100 + "/"}</span>
                                    <span className='item-type'>{(menuItem.card?.info?.isVeg === 1) ? "🟢" : "🔴"}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default RestaurantMenu;
