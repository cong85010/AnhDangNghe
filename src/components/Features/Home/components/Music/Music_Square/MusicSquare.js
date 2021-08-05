import React, { useRef } from "react";
import SubMusicSquare from "../SubMusicSquare/SubMusicSquare";
import Slider from "react-slick";
import './MusicSquare.scss'
const MusicSquare = ({ title = 'Top 100', dataTopMusic = []}) => {
  const ref = useRef({});

  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };

  const settings = {
    className: "section-outstanding__slider",
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };
  return (
    <div className="MusicSquare">
      <h2 className='MusicSquare__title'>{title}</h2>
      <Slider ref={ref} {...settings}>
        {
          dataTopMusic.map((data, index) => <SubMusicSquare data={data} index={index}/>)
        }
      </Slider>
      <div style={{ textAlign: "center" }}>
        <button className="button" onClick={previous}>
          Previous
        </button>
        <button className="button" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MusicSquare;
