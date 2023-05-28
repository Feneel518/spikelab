import React from "react";

const CarouselItem = ({ children, index, activeIndex }) => {
  const offset = (index - activeIndex) / 4;
  const direction = Math.sign(index - activeIndex);
  const obsOffset = Math.abs(offset);

  const cssTransform = `
  rotateY(calc(${offset} * 45deg))
  scaleY(calc(1 + ${obsOffset} * -0.4))
  translateX(calc(${direction} * -3.5rem))
  translateZ(calc(${obsOffset} * -40rem))
  `;

  const cssOpacity = `
  ${Math.abs(index - activeIndex) >= 3 ? "0" : "1"}
  `;

  const cssDisplay = `
  ${Math.abs(index - activeIndex) >= 3 ? "none" : "block"}
  `;

  return (
    <div
      className="carousel-item"
      style={{
        transform: cssTransform,
        opacity: cssOpacity,
        display: cssDisplay,
      }}
    >
      {children}
    </div>
  );
};

export default CarouselItem;
