import { Layout } from 'antd';
import { MusicProvider } from 'components/contextAPI/context';
import MusicPlay from 'components/Features/Home/components/Music/MusicPlay/MusicPlay';
import ListMusic from 'components/Features/Home/components/Music/Music_Right/ListMusic';
import HomeSider from 'components/Features/Home/components/Sider/Sider';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home_Header from 'components/Features/Home/components/Header/Header';
import Album from 'components/Features/Album/Album';
import axios from 'axios';
import dataDefault from 'constants/dataDefault';
import './assets/styles/styles.scss'
import pageNotFound from 'components/pageNotFound/pageNotFound';
export const options = (urlLink) => {
  return {
    url: `http://localhost:3000/${urlLink}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
  }
};
const Home = React.lazy(() => import('./components/Features/Home/index'))
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const clickClose = () => setCollapsed(!collapsed);
  const [danhSachPhat, setdanhSachPhat] = useState(dataDefault);
  const [listTop100, setlistTop100] = useState([]);
  const [listTop100V2, setlistTop100V2] = useState([]);
  const [listTop100V3, setlistTop100V3] = useState([]);
  const [ngheGanDay, setngheGanDay] = useState([]);
  const [playing, setPlaying] = useState({ title: "closeMusicPlaying" });
  const [isPlay, setIsPlay] = useState(false);
  const refHeader = useRef(null)
  const [changeHeader, setchangeHeader] = useState('')
  const [backGrounds, setBackGrounds] = useState({
    "className": "backgroundDefault",
    "src": "https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/zma.svg"
  })

  const saveMusic = (music) => {
    const indexMusic = ngheGanDay.findIndex(
      (item) => item.music === music.music
    );
    if (indexMusic !== -1) {
      ngheGanDay.splice(indexMusic, 1);
    }
    localStorage.setItem("ngheganday", JSON.stringify([music, ...ngheGanDay]));
    setPlaying(music);
  };
  // Promise.all
  useEffect(() => {
    axios(options('dataDefault'))
      .then(response => {
        setdanhSachPhat(response.data)
      });
    axios(options('top100vn1'))
      .then(response => {
        setlistTop100(response.data)
      });
    axios(options('top100vn2'))
      .then(response => {
        setlistTop100V2(response.data)
      });
    axios(options('top100usuk'))
      .then(response => {
        setlistTop100V3(response.data)
      });

  }, [])
  useEffect(() => {
    setngheGanDay(JSON.parse(localStorage.getItem("ngheganday")) || []);
  }, [playing]);
  const nextPrePlayingMusic = (num) => {
    const indexMusic = danhSachPhat.songs.findIndex(
      (music) => music.music === playing.music
    );
    if (indexMusic === 0 && num === -1) {
      num = 0
    }

    (indexMusic >= 0 && indexMusic < danhSachPhat.songs.length - 1)
      ? setPlaying(danhSachPhat.songs[indexMusic + num])
      : setPlaying(danhSachPhat.songs[0])
  };
  const getTop100OfList100 = (id) => {
    const object100 = listTop100.filter((item) => item.id === id);
    return object100
  }
  const nextWillPlayingMusic = () => {
    if (danhSachPhat.songs.length > 0) {
      const indexMusic = danhSachPhat.songs.findIndex(
        (music) => music.music === playing.music
      );
      return indexMusic >= danhSachPhat.songs.length - 1
        ? danhSachPhat.songs[0]
        : danhSachPhat.songs[indexMusic + 1];
    }
    return {};
  };
  const handleNewDSP = (newDanhSachPhat) => {
    saveMusic(newDanhSachPhat.songs[0])
    setdanhSachPhat(newDanhSachPhat);
  }
  const handlebackground = (bg) => {
    setBackGrounds(bg)
    localStorage.setItem('setBackGround', JSON.stringify(bg))
  }
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem('setBackGround')) || {}
    if (Object.keys(obj).length) {
      setBackGrounds(obj)
    }
  }, [])
  const [offSet, setoffSet] = useState(0)
  useEffect(() => {
    if (refHeader.current) {
      console.log(refHeader.current)
      setoffSet(refHeader.current.offsetTop.y)
    }
  }, [offSet])
  const check = () => setchangeHeader((refHeader.current.getBoundingClientRect().y < 0) ? 'fixedHeader' : '')
  // setchangeHeader((refHeader.current.getBoundingClientRect().y < 0) ? 'fixedHeader':'')
  const [charCode, setCharCode] = useState({});
  const handleKeyPess = (e) => {
    if (e.keyCode === 32 ||
      e.keyCode === 37 ||
      e.keyCode === 39 ||
      e.keyCode === 187 ||
      e.keyCode === 189
    )
      setCharCode({ code: e.keyCode, isLoad: !charCode.isLoad })
  }
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <BrowserRouter>
        <MusicProvider value={{
          playing,
          isPlay,
          setIsPlay,
          getTop100OfList100,
          saveMusic,
          handleNewDSP,
          clickClose,
          listTop100,
          listTop100V2,
          listTop100V3,
          collapsed,
          danhSachPhat,
          backGrounds,
          handlebackground,
        }}>
          <div tabIndex="1" onKeyDown={handleKeyPess} className={backGrounds.className}>
            <Layout>
              <HomeSider collapsed={collapsed} />
              <Layout id="changeHeader" onWheel={check}
                className={`site-layout ${playing.music && '__100px'} scroll`}>
                <div ref={refHeader} >
                  <div className={`nonChangeHeader ${changeHeader}`}>
                    <Home_Header id="headers" collapsed={collapsed} clickClose={clickClose} />
                  </div>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/album/:id' component={Album} />
                    <Route path='*' component={pageNotFound} />
                  </Switch>
                </div>

              </Layout>
              <ListMusic
                listData_Current={danhSachPhat}
                listData_History={ngheGanDay}
              />
            </Layout>
            <MusicPlay
              nextPrePlayingMusic={nextPrePlayingMusic}
              nextWillPlay={nextWillPlayingMusic}
              charCode={charCode}
            />
          </div>
        </MusicProvider>
      </BrowserRouter>
    </Suspense>

  );
}

export default App;
