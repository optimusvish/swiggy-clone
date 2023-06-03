import React from 'react';

const Shimmer = () => {
    return (
        <div className='restaurant-container'>
            {Array(10)
                .fill("")
                .map((e, index) => (
                    <div key={index} className="restaurant-card-shimmer"></div>
                ))
            }
        </div>
    );
};

export default Shimmer;
