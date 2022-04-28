import React, { useEffect, useRef, useState } from "react";
import SubMusicSquare from "../SubMusicSquare/SubMusicSquare";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import "./MusicSquare.scss";
import { Button } from "antd";
import NhacCuaTui from "nhaccuatui-api-full";

const MusicSquare = ({ title = "Top 100", dataTopMusic = [], keyFetch }) => {
  const ref = useRef({});
  const [index, setindex] = useState(0);
  const [data, setData] = useState({});
  console.log(keyFetch);
  useEffect(() => {
    NhacCuaTui.getTopicDetail(keyFetch).then((res) => setData(res.topic));
  }, []);
  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };
  const dataLoading = [1, 2, 3, 4];
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 632,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="MusicSquare">
      <div className="MusicSquare__top">
        <h2 className="MusicSquare__top-title">{title}</h2>
        <div className="MusicSquare__top-button">
          <Button
            type="ghost"
            disabled={index === 0}
            className="button"
            onClick={previous}
          >
            <LeftOutlined />
          </Button>
          <Button
            type="ghost"
            disabled={index === dataTopMusic.length - 4}
            className="button"
            onClick={next}
          >
            <RightOutlined />
          </Button>
        </div>
      </div>
      <Slider ref={ref} {...settings}>
        {data?.playlist?.map((list, index) => (
          <SubMusicSquare data={list} key={index} index={index} />
        ))}
      </Slider>
    </div>
  );
};

export default MusicSquare;
