import { Modal, Button } from "antd";
import React, { useContext, useState } from "react";
import Slider from "react-slick";
import { Spin } from 'antd';
import { ShimmerThumbnail } from "react-shimmer-effects";

import {
  PlayCircleOutlined,
} from "@ant-design/icons";
import "./Slider.scss";
import { MusicPlayerContext } from "components/contextAPI/context";
const Home_Slider = ({ dataBanner }) => {

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const loadingBanner = [1, 2, 3]
  const [modal, setModal] = useState({});
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = (item) => {
    setVisible(true);
    setModal(item)
  };
  const { saveMusic, backGrounds } = useContext(MusicPlayerContext);
  const handleOk = () => {
    ('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      saveMusic(modal)
    }, 1000);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="HomeSlider">
      <Slider {...settings}>
        {
          dataBanner.length ?
            dataBanner.map((item, index) => (
              <div className="sliderItem" key={index} onClick={() => showModal(item)}>
                <img src={item.avatar} alt={item.title} />
              </div>
            )) :
            loadingBanner.map((t, i) => (<div key={i} className="sliderItem">
              <ShimmerThumbnail height={180} rounded />
            </div>))
        }
      </Slider>
      <Modal
        visible={visible}
        className={`HomeSliderModal ${backGrounds.className}`}
        onCancel={handleCancel}
      >
        <p>Bạn có muốn phát bài hát này?</p>
        <img src={modal.avatar} alt={modal.title} />
        <p>{modal.title}
          <p>{modal.creator}</p>
        </p>
        <p><Button type="primary" size='large' onClick={handleOk}>{confirmLoading ? <Spin /> : <p><PlayCircleOutlined /> Phát</p>}</Button></p>

      </Modal>
    </div>
  );
};


export default Home_Slider;
