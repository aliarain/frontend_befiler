import React from 'react';


const Backdrop = ({show,handleCloseSideBar}) => {
    

    return (
        <div className={show ? 'backdrop open' : ' backdrop'} onClick={handleCloseSideBar}>
            
        </div>
    );
};

export default Backdrop;