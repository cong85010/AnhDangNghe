import { Col, Row, Table } from 'antd'
import axios from 'axios'
import { MusicPlayerContext } from 'components/contextAPI/context'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import SubMusicSquare from '../Home/components/Music/SubMusicSquare/SubMusicSquare'
import './album.scss'
export default function Album() {
    const { id } = useParams()
    const [ablum, setAblum] = useState({})
    const options = {
        url: `http://localhost:3000/Top100/${id}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    useEffect(() => {
        axios(options)
            .then(response => {
                setAblum(response.data)
            });
    }, [])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'avatar',
            width: 50,
            maxWidth: 50,
            render: (t, r) => <img src={`${r.avatar}`} />
        },
        {
            title: '',
            dataIndex: 'title',
            width: 250,
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            width: 150,
        },
    ];
    const { handleNewDSP, saveMusic, isPlay, backGrounds } = useContext(MusicPlayerContext);
    const handleplay = (r, t) => {
        handleNewDSP(ablum)
        saveMusic(r)
    }
    return (
        <Row
            className={`album ${backGrounds}`}>
            <Col className='flex-center' span={6}>
                {ablum && <SubMusicSquare data={ablum} circle={isPlay} />}
            </Col>
            <Col span={17} offset={1}>
                <Table
                    columns={columns}
                    dataSource={ablum.songs}
                    pagination={false}
                    onSelect={(r, t, d) => console.log(r, t, d)}
                    onRow={(r, t) => { return { onClick: () => handleplay(r, t) } }}
                    scroll={{ y: 'calc(100vh - 300px)' }
                    }
                />
            </Col>
        </Row>
    )
}
