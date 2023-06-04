import React, {useEffect, useState, useRef} from 'react';
import RestaurantCard from './RestaurantCard';
import RESTAURANT_LIST from '../utils/mockData';
import { OFFSET_LIMIT, OFFSET_NEXT_PAGE_LIMIT, SWIGGY_API, SWIGGY_PAGINATION_API } from '../utils/constants';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';

const Body = () => {
    const [paginationFlag, setPaginationFlag] = useState(false);
    let [apiUrl, setApiUrl] = useState(SWIGGY_API);
    let [allRestaurantList, setAllRestaurantsList] = useState([]);
    //let [offsetLimit, setOffsetLimit] = useState(OFFSET_LIMIT);
    let [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    let [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(false);
    let offsetLimit = useRef(OFFSET_LIMIT);

    useEffect(() => {
        //window.addEventListener("scroll", handleScroll);
        fetchAllRestaurantsData();
        //return () => window.removeEventListener('scroll', handleScroll);
    }, [paginationFlag]);

    const handleScroll = () => {
        console.log(window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight);
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            fetchAllRestaurantsData();
            setPaginationFlag(true);
            offsetLimit.current = offsetLimit.current+OFFSET_LIMIT;
            setApiUrl(SWIGGY_PAGINATION_API + offsetLimit);
        }
    };

    const fetchAllRestaurantsData = async () => {
        console.log(allRestaurantList.length);
        try {
            const data = await fetch(apiUrl);
            const json = await data.json();
            let allRestaurants = json.data?.cards[2]?.data?.data?.cards;
            if (paginationFlag) {
                allRestaurants = json.data?.cards;
                allRestaurants = allRestaurants?.map(
                    (res) => {return res.data;}
                );
            }
            console.log(apiUrl, allRestaurants.length);
            setIsLoadMoreEnabled(allRestaurants.length >= OFFSET_LIMIT);
            if(isLoadMoreEnabled) {
                offsetLimit.current = offsetLimit.current+OFFSET_NEXT_PAGE_LIMIT;
                setApiUrl(SWIGGY_PAGINATION_API + offsetLimit.current);
            }
            const totalRestaurants = [...allRestaurantList, ...allRestaurants];
            setAllRestaurantsList(totalRestaurants);
            setListOfRestaurants(totalRestaurants);
        } catch (error) {
            //console.log(error);
        } finally {
            setPaginationFlag(false);
        }
    };

    return (
        <div className="body">
            <div className='restaurant-list-container'>
                <div className='search-container'>
                    <div className="search">
                        <input type="text" 
                            className="search-input" 
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            placeholder='Search by Restaurant...'
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
                                    (res) => res.data.avgRating > 4
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
                        <>
                        <div className="restaurant-container">
                            {
                                listOfRestaurants.map(
                                    (restaurant) => {
                                        return (
                                        <Link 
                                            to={"/restaurant/" + restaurant.data?.id} 
                                            key={restaurant.data?.uuid}
                                            className='restaurant-card-link'
                                        > 
                                            <RestaurantCard restaurantData={restaurant} /> 
                                        </Link>
                                        );
                                    }
                                )
                            }
                        </div>
                        {
                            (isLoadMoreEnabled) ? 
                                <div className='loadmore'>
                                    <button 
                                        className='loadmore-button'
                                        onClick={() => {
                                            setPaginationFlag(true);
                                            //offsetLimit.current = offsetLimit.current+1;
                                            setApiUrl(SWIGGY_PAGINATION_API + offsetLimit.current);
                                        }}
                                    >
                                        Load More
                                    </button>
                                </div> 
                            : ''
                        }
                        
                        </>
                    :
                        <Shimmer />
                }
            </div>
        </div>
    );
};

export default Body;
