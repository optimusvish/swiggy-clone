import { useEffect, useRef, useState } from "react";
import { OFFSET_LIMIT, OFFSET_NEXT_PAGE_LIMIT, SWIGGY_PAGINATION_API } from "./constants";

const useAllRestaurants = (apiUrl, isLoadMoreEnabled, paginationFlag) => {
    const [paginationFlag, setPaginationFlag] = useState(false);
    let [apiUrl, setApiUrl] = useState(apiUrl);
    let [allRestaurantList, setAllRestaurantsList] = useState([]);
    let [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(isLoadMoreEnabled);
    let offsetLimit = useRef(OFFSET_LIMIT);

    useEffect(() => {
        fetchAllRestaurantsData();
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
            setIsLoadMoreEnabled(allRestaurants.length >= OFFSET_LIMIT);
            if(isLoadMoreEnabled) {
                offsetLimit.current = offsetLimit.current + OFFSET_NEXT_PAGE_LIMIT;
                setApiUrl(SWIGGY_PAGINATION_API + offsetLimit.current);
            }
            const totalRestaurants = [...allRestaurantList, ...allRestaurants];
            setAllRestaurantsList(totalRestaurants);
        } catch (error) {
            //console.log(error);
        } finally {
            setPaginationFlag(false);
        }
    };
    return allRestaurantList;
}

export default useAllRestaurants;
