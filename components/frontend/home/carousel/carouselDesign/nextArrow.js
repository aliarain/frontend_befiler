import React from 'react';

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;

    
    return (
        // carousel next arrow customization
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent:'center',alignItems:"center",background: "#14AA40",  position: 'absolute', right: '50px',top:"270px" }}
            onClick={onClick}
        />
    );
};

export default SampleNextArrow;