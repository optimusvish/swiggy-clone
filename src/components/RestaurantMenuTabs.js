import React, { useState } from 'react';
import RestaurantMenuItem from './RestaurantMenuItem';
import RestaurantItemCategories from './RestaurantItemCategories';

const RestaurantMenuTabs = ({restaurantMenuData}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    restaurantMenuData.map(
        (restaurantMenu) => {
            const {title, type, itemCards, categories} = (restaurantMenu?.card?.card) ? restaurantMenu?.card?.card : restaurantMenu;
            return (
                <div key={title + "-" + Math.random()} >
                  <div className='recommended-div'>
                      <div className='minimize-button'>
                        <button 
                          className='open-close'
                          onClick={() => {
                            setIsOpen(!isOpen);
                          }}
                        >
                          {(isOpen) ? 'Close' : 'Open'}
                        </button>
                      </div>
                      { (isOpen) && 
                        <>
                          <div className='tab-name'>{title}</div>
                          {(categories) && <RestaurantItemCategories categories={categories}/>}
                          {(itemCards) && <RestaurantMenuItem itemCards={itemCards} /> }
                        </>
                      }
                  </div>
                  <div className="main_border"></div>
                </div>
            );
        }
    )
  )
}

export default RestaurantMenuTabs;
