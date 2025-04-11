import React from 'react';


const Card = ({ cards ,handleOnClick}) => {
    
    return (
        <div className='flex justify-center bg-white p-3 rounded shadow-lg'>
            <div>
                <p className={`text-center text-gray-600 text-lg`}>{cards?.tittle}</p>
                <button onClick={handleOnClick} className={`${cards?.btnBgColor} ${cards?.btnbgHover} text-white px-6 py-2 mb-1 rounded  shadow hover:shador-xl`}>{cards?.btntext}</button>
            </div>
        </div>
    );
};

export default Card;