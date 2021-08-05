import React from "react";
import Slider from "react-slick";

import "./Slider.scss";
const Home_Slider = ({ dataBanner }) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <div className="HomeSlider">
      <Slider {...settings}>
        {dataBanner.map((item, index) => (
          <div className="sliderItem" key={index}>
            <img src={item.url} alt={item.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home_Slider;
