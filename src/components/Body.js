import React, {useEffect, useState, useRef} from 'react';
import RestaurantCard from './RestaurantCard';
import { OFFSET_LIMIT, OFFSET_NEXT_PAGE_LIMIT, SWIGGY_API, SWIGGY_PAGINATION_API } from '../utils/constants';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Body = () => {
    const [paginationFlag, setPaginationFlag] = useState(false);
    const [apiUrl, setApiUrl] = useState(SWIGGY_API);
    const [allRestaurantList, setAllRestaurantsList] = useState([]);
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(false);
    const [loadMoreFlag, setLoadMoreFlag] = useState(false);
    const onlineStatus = useOnlineStatus();
    let offsetLimit = useRef(OFFSET_LIMIT);

    useEffect(() => {
        ((paginationFlag || offsetLimit.current === OFFSET_LIMIT) && onlineStatus) ? fetchAllRestaurantsData() : '';
    }, [paginationFlag]);

    const fetchAllRestaurantsData = async () => {
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
            //console.log(apiUrl, allRestaurants.length);
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
            setLoadMoreFlag(true);
        }
    };

    if(!onlineStatus) return(<h1>You are Offline!!</h1>);

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
                                    setIsLoadMoreEnabled(listOfRestaurants.length >= OFFSET_LIMIT);
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
                                setIsLoadMoreEnabled(listOfRestaurants.length >= OFFSET_LIMIT);
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
                                    {
                                        (loadMoreFlag) ? <button 
                                            className='loadmore-button'
                                            onClick={() => {
                                                setPaginationFlag(true);
                                                setApiUrl(SWIGGY_PAGINATION_API + offsetLimit.current);
                                                setLoadMoreFlag(false);
                                            }}
                                        >
                                            Load More
                                        </button> : 'Loading...'
                                    }
                                    
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
