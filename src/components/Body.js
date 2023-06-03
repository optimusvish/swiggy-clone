import React, {useEffect, useState} from 'react';
import RestaurantCard from './RestaurantCard';
import RESTAURANT_LIST from '../utils/mockData';
import { SWIGGY_API } from '../utils/constants';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';

const Body = () => {
    let [allRestaurantList, setAllRestaurantsList] = useState([]);

    let [listOfRestaurants, setListOfRestaurants] = useState(allRestaurantList);
    const [searchKey, setSearchKey] = useState("");
    useEffect(() => {
        fetchAllRestaurantsData();
    }, []);

    const fetchAllRestaurantsData = async () => {
        const data = await fetch(SWIGGY_API);
        const json = await data.json();
        const allRestaurants = json.data?.cards[2]?.data?.data?.cards;
        setAllRestaurantsList(allRestaurants);
        setListOfRestaurants(allRestaurants);
    };

    return (
        <div className="body">
            <div className='search-container'>
                <div className="search">
                    <input type="text" 
                        className="search-input" 
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <button 
                        className="search-button"
                        onClick={ () => 
                            {
                                listOfRestaurants = allRestaurantList.filter(
                                    (res) => res.data.name.toLowerCase().includes(searchKey.toLowerCase())
                                );
                                setListOfRestaurants(listOfRestaurants);
                            }
                        }
                    >
                        Search
                    </button>
                </div>
                <div className="filter">
                    <button 
                        className="filter-button"
                        onClick={ () =>{
                            listOfRestaurants = listOfRestaurants.filter(
                                (res) => res.data.avgRating > 3.5
                            );
                            setListOfRestaurants(listOfRestaurants);
                        }}
                    >
                        Top Rated Restaurants
                    </button>
                </div>
            </div>
            {
                (listOfRestaurants.length > 0) ? 
                    <div className="restaurant-container">
                        {
                            listOfRestaurants.map(
                                (restaurant) => {
                                    return (
                                    <Link to={"/restaurant/" + restaurant.data?.id} key={restaurant.data?.uuid}> 
                                        <RestaurantCard restaurantData={restaurant} /> 
                                    </Link>
                                    );
                                }
                            )
                        }
                    </div> 
                :
                    <Shimmer />
            }
        </div>
    );
};

export default Body;
