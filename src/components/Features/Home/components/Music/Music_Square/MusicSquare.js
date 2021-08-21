import React, { useRef, useState } from "react";
import SubMusicSquare from "../SubMusicSquare/SubMusicSquare";
import Slider from "react-slick";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

import './MusicSquare.scss'
import { Button } from "antd";

const MusicSquare = ({ title = 'Top 100', dataTopMusic = []}) => {
  const ref = useRef({});
  const [index, setindex] = useState(0)
  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };
  
  const settings = {
    className: "section-outstanding__slider",
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    beforeChange: (pre, next) => setindex(next), 
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows:1,
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
      <div  className='MusicSquare__button'>
        <Button type='ghost' disabled={index === 0} className="button" onClick={previous}>
        <LeftOutlined />
        </Button>
        <Button type='ghost' disabled={index === dataTopMusic.length - 4} className="button" onClick={next}>
        <RightOutlined />
        </Button>
      </div>
      <Slider ref={ref} {...settings}>
        {
          dataTopMusic.map((data, index) => <SubMusicSquare data={data} index={index}/>)
        }
      </Slider>
    </div>
  );
};

export default MusicSquare;
