import React from 'react';
import { OFFSET_LIMIT } from '../utils/constants';

const Shimmer = () => {
    return (
        <div className='restaurant-container'>
            {Array(OFFSET_LIMIT)
                .fill("")
                .map((e, index) => (
                    <div key={index} className="restaurant-card-shimmer"></div>
                ))
            }
        </div>
    );
};

export default Shimmer;
