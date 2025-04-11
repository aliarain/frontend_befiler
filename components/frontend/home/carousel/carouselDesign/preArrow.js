import React from 'react';

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;

    
  return (
     // carousel previous arrow customization
    <div
      className={className}
      style={{ ...style, display: "flex", justifyContent:'center',alignItems:"center",background: "#14AA40", position: 'absolute', top:"270px",left:"800px", zIndex:"10" }}
      onClick={onClick}
    />
  );
};

export default SamplePrevArrow;