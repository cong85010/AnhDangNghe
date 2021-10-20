import { Col, Row, Table } from 'antd'
import { options } from 'App'
import axios from 'axios'
import { MusicPlayerContext } from 'components/contextAPI/context'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import MusicSquare from '../Home/components/Music/Music_Square/MusicSquare'
import SubMusicSquare from '../Home/components/Music/SubMusicSquare/SubMusicSquare'
import Default from "constants/dataDefault";

import './album.scss'
export const Duration = function ({ props }) {
    const [duration, setDuration] = useState("00:00")
    const audio = new Audio(props.music)
    audio.onloadedmetadata = (e) => {
        if (audio.readyState > 0) {
            var minutes = "0" + parseInt(audio.duration / 60, 10);
            var seconds = "0" + parseInt(audio.duration % 60);
            setDuration(minutes + ":" + seconds.slice(-2))
        }
    }
    return duration
}
export default function Album() {
    const { id } = useParams()
    const [nameValue, params] = id.split('=')
    const [ablum, setAblum] = useState({})
    const { handleNewDSP, saveMusic, isPlay, scrollToTop } = useContext(MusicPlayerContext);
    const [moreAlbum, setMoreAlbum] = useState([])
    useEffect(() => {
        axios(options(`top100${nameValue}/${params}`))
            .then(response => {
                setAblum(response.data)
            }).catch(err => { console.error(err) })
        axios(options(`top100${nameValue}`))
            .then(response => {
                setMoreAlbum(response.data)
            })
        const obj = document.getElementById('scrollTop')
        const tableScroll = obj.getElementsByClassName('ant-table-body')
        tableScroll[0].scrollTop = 0
        scrollToTop()
    }, [id])



    const columns = [
        {
            title: "No",
            key: "index",
            width: "50px",
            render: (value, item, index) => index + 1
        },
        {
            title: 'Name',
            dataIndex: 'avatar',
            width: "70px",
            render: (t, r) => <img src={t} alt='img' onError={(e) => { e.target.onerror = null; e.target.src = Default.avatar }} />
        },
        {
            dataIndex: ['title', 'creator'],
            render: (text, row) => <div>
                <p className='m-0'>{row['title']}</p>
                <small className='opacity-0_5'>{row['creator']}</small>
            </div>
        },
        {
            title: 'Time',
            maxWidth: '200px',
            render: (t, r) => <Duration props={t} />

        },
    ];
    const handleplay = (r, t) => {
        handleNewDSP(ablum)
        saveMusic(r)
    }
    return (
        <Row className="album">
            <Col className='flex-center'
                xs={24}
                sm={24}
                md={24}
                lg={6}
                xl={6}
            >
                {ablum && <SubMusicSquare data={ablum} circle={isPlay} />}
            </Col>
            <Col
                xs={24}
                sm={24}
                md={24}
                lg={18}
                xl={18}>
                <Table
                    id="scrollTop"
                    columns={columns}
                    dataSource={ablum.songs}
                    pagination={false}
                    onRow={(r, t) => { return { onClick: () => handleplay(r, t) } }}
                    scroll={{ y: 'calc(100vh - 300px)' }
                    }
                />
            </Col>
            <Col span={24}>
                <MusicSquare title="Liên quan" dataTopMusic={moreAlbum} />
            </Col>
        </Row>
    )
}
