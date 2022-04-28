import { Button, Col, Layout, Row } from "antd";
import { MusicProvider } from "components/contextAPI/context";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import HomeHeader from "components/Features/Home/components/Header/Header";
import axios from "axios";
import dataDefault from "constants/dataDefault";
import "./assets/styles/styles.scss";
import pageNotFound from "components/pageNotFound/pageNotFound";
import {
  AlignRightOutlined,
  CloseSquareOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import NhacCuaTui from "nhaccuatui-api-full";

//export const POST_URL = 'https://server-anhdangnghe.herokuapp.com/'

export const POST_URL = "http://localhost:3000/";

export const options = (urlLink) => {
  return {
    url: `${POST_URL + urlLink}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
};
export const USER_DEFAULT = {
  status: false,
  username: "Khách",
  avatar: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
};
const Home = React.lazy(() => import("components/Features/Home/index"));
const Album = React.lazy(() => import("components/Features/Album/Album"));
const Chart = React.lazy(() => import("components/Features/Chart/Chart"));
const Login = React.lazy(() => import("components/Features/Login/Login"));
const MusicPlay = React.lazy(() =>
  import("components/Features/Home/components/Music/MusicPlay/MusicPlay")
);
const ListMusic = React.lazy(() =>
  import("components/Features/Home/components/Music/Music_Right/ListMusic")
);
const Register = React.lazy(() =>
  import("components/Features/Register/Register")
);
const HomeSider = React.lazy(() =>
  import("components/Features/Home/components/Sider/Sider")
);
const MyMusic = React.lazy(() => import("components/Features/MyMusic/MyMusic"));
const MAX_LATELY_MUSIC = 20;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const clickClose = () => setCollapsed(!collapsed);
  const [danhSachPhat, setdanhSachPhat] = useState(dataDefault);
  const [listTop100, setlistTop100] = useState([]);
  const [listTop100V3, setlistTop100V3] = useState([]);
  const [ngheGanDay, setngheGanDay] = useState([]);
  const [playing, setPlaying] = useState({ title: "closeMusicPlaying" });
  const [isPlay, setIsPlay] = useState(false);
  const [user, setUser] = useState(USER_DEFAULT);
  const refHeader = useRef(null);
  const [changeHeader, setchangeHeader] = useState("");
  const [backGrounds, setBackGrounds] = useState({
    className: "backgroundDefault",
    src: "https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/zma.svg",
  });
  const saveMusic = (music) => {
    const indexMusic = ngheGanDay.findIndex((item) => item?.key === music?.key);
    if (indexMusic !== -1) {
      ngheGanDay.splice(indexMusic, 1);
    }
    localStorage.setItem(
      "ngheganday",
      JSON.stringify([music, ...ngheGanDay].splice(0, MAX_LATELY_MUSIC))
    );
    setPlaying(music);
  };
  // Promise.all
  useEffect(() => {
    axios(options("top100vn1")).then((response) => {
      setlistTop100(response.data);
    });

    axios(options("top100usuk")).then((response) => {
      setlistTop100V3(response.data);
    });
  }, []);
  const scrollToTop = () => {
    const objScroll = document.getElementById("scrollTop");
    console.log(objScroll);
    objScroll.scrollTop = 0;
  };
  useEffect(() => {
    setngheGanDay(JSON.parse(localStorage.getItem("ngheganday")) || []);
  }, [playing]);
  const nextPrePlayingMusic = (num) => {
    console.log(num);
    const indexMusic = danhSachPhat.songs.findIndex(
      (music) => music?.key === playing?.key
    );
    if (indexMusic === 0 && num === -1) {
      num = 0;
    }
    console.log(indexMusic);

    indexMusic >= 0 && indexMusic < danhSachPhat.songs.length - 1
      ? setPlaying(danhSachPhat.songs[indexMusic + num])
      : setPlaying(danhSachPhat.songs[0]);
    console.log(danhSachPhat.songs[indexMusic + num]);
  };
  const getTop100OfList100 = (id) => {
    const object100 = listTop100.filter((item) => item.id === id);
    return object100;
  };
  const nextWillPlayingMusic = () => {
    if (danhSachPhat?.songs.length > 0) {
      const indexMusic = danhSachPhat?.songs.findIndex(
        (music) => music?.key === playing?.key
      );
      return indexMusic >= danhSachPhat.songs.length - 1
        ? danhSachPhat.songs[0]
        : danhSachPhat.songs[indexMusic + 1];
    }
    return {};
  };
  const handleNewDSP = (newDanhSachPhat) => {
    console.log(newDanhSachPhat);
    saveMusic(newDanhSachPhat?.songs[0] || null);
    setdanhSachPhat(newDanhSachPhat);
  };
  const handlebackground = (bg) => {
    setBackGrounds(bg);
    localStorage.setItem("setBackGround", JSON.stringify(bg));
  };
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("setBackGround")) || {};
    if (Object.keys(obj).length) {
      setBackGrounds(obj);
    }
    const objAVT = JSON.parse(localStorage.getItem("user")) || {};
    if (Object.keys(objAVT).length) {
      setUser(objAVT);
    }
  }, []);
  const [offSet, setoffSet] = useState(0);
  useEffect(() => {
    if (refHeader.current) {
      console.log(refHeader.current);
      // setoffSet(refHeader.current.offsetTop.y);
    }
  }, [offSet]);
  const changeBackgroundHeader = () => {
    const posTop = refHeader.current.scrollTop;
    if (posTop > 100 && posTop < 200) {
      // setchangeHeader("changeHeader")
    } else if (posTop < 100) {
      // setchangeHeader("")
    }
  };

  // setchangeHeader((refHeader.current.getBoundingClientRect().y < 0) ? 'fixedHeader':'')
  const [charCode, setCharCode] = useState({});
  const handleKeyPess = (e) => {
    if (
      e.keyCode === 32 ||
      e.keyCode === 37 ||
      e.keyCode === 39 ||
      e.keyCode === 187 ||
      e.keyCode === 189
    )
      setCharCode({ code: e.keyCode, isLoad: !charCode.isLoad });
  };
  const handleUser = useCallback(
    (value) => {
      setUser(value);
    },
    [user]
  );
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <BrowserRouter>
        <MusicProvider
          value={{
            playing,
            isPlay,
            setIsPlay,
            getTop100OfList100,
            saveMusic,
            handleNewDSP,
            clickClose,
            listTop100,
            listTop100V3,
            collapsed,
            danhSachPhat,
            backGrounds,
            handlebackground,
            scrollToTop,
            user,
            handleUser,
            nextPrePlayingMusic,
          }}
        >
          <div
            tabIndex="1"
            onKeyDown={handleKeyPess}
            className={backGrounds.className}
          >
            <Row className="container">
              <Col xs={3} sm={3} md={5} lg={5} xl={collapsed ? 1 : 3}>
                <HomeSider collapsed={collapsed} />
              </Col>
              {/* <ListMenuLeft /> */}
              <Col xs={21} sm={21} md={19} lg={19} xl={collapsed ? 19 : 17}>
                {/* <div className="h-64"></div> */}
                <Layout id="changeHeader">
                  <dispatchEvent>
                    <div className={`nonChangeHeader ${changeHeader}`}>
                      <HomeHeader
                        id="headers"
                        collapsed={collapsed}
                        clickClose={clickClose}
                      />
                    </div>
                    <div
                      ref={refHeader}
                      onScroll={changeBackgroundHeader}
                      id="scrollTop"
                      className={`site-layout ${
                        playing?.music && "__100px"
                      } scroll `}
                    >
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/my-music" component={MyMusic} />
                        <Route path="/album/:id" component={Album} />
                        <Route exact path="/top-chart" component={Chart} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route path="*" component={pageNotFound} />
                      </Switch>
                    </div>
                  </dispatchEvent>
                </Layout>
                {/*Screen Desktop small  */}
                <ListMenuRight
                  danhSachPhat={danhSachPhat}
                  ngheGanDay={ngheGanDay}
                />
              </Col>
              <Col xs={0} sm={0} md={0} lg={0} xl={4}>
                <ListMusic
                  listData_Current={danhSachPhat}
                  listData_History={ngheGanDay}
                />
              </Col>
            </Row>
            <MusicPlay
              nextWillPlay={nextWillPlayingMusic}
              charCode={charCode}
            />
          </div>
        </MusicProvider>
      </BrowserRouter>
    </Suspense>
  );
}
export const ListMenuRight = ({ danhSachPhat, ngheGanDay }) => {
  const [className, setClassName] = useState(false);
  return (
    <div className="fixed">
      <div
        onClick={() => setClassName(false)}
        className={`${className && "overlay"}`}
      ></div>
      <div className={`fixedPos fixListMusic ${className && "showListMenu"}`}>
        <Button
          className="fixListMusic--button colorBody"
          shape="circle"
          outline="true"
          type="link"
          onClick={() => setClassName(!className)}
          icon={className ? <CloseSquareOutlined /> : <AlignRightOutlined />}
        ></Button>
        <ListMusic
          listData_Current={danhSachPhat}
          listData_History={ngheGanDay}
        />
      </div>
    </div>
  );
};
export default App;
