import React, { useContext, useEffect, useState } from 'react'
import { Line, TinyLine } from '@ant-design/charts';
import './chart.scss';
import axios from 'axios';
import { options } from 'App';
import moment from 'moment';
import { List, Avatar, Button, Skeleton } from 'antd';
import { MusicPlayerContext } from "components/contextAPI/context";

export default function Chart() {
    const COUNT = 10
    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const THREE_LINE = 3 // 3 songs
    const { danhSachPhat } = useContext(MusicPlayerContext)
    const [list, setList] = useState(danhSachPhat.songs)

    useEffect(() => {
        axios(options("chart")).then((response) => {
            const arr = response.data
            let date = moment().format('DD-MM-YYYY')
            const length = arr.length
            for (let i = length - 1; i >= 0; i -= THREE_LINE) {
                arr[i].date = date
                arr[i - 1].date = date
                arr[i - 2].date = date
                //convert today from 15 days ago
                date = (moment(date, 'DD-MM-YYYY').subtract(1, 'days').format('DD-MM-YYYY'));
            }
            setData(arr)
        }
        );
    }, []);

    var config = {
        data: data,
        xField: 'date',
        yField: 'value',
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v)
                },
            },
            title: {
                text: 'View',
                style: { fontSize: 16 },
            },
        },
        seriesField: 'title',
        color: function color(_ref) {
            const { title } = _ref;
            return title === 'Muộn rồi mà sao còn' ? '#F4664A' : title === 'Thê lương' ? '#30BF78' : '#FAAD14';
        },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };
    const onLoadMore = () => {
        setLoading(true);
        setList(list.concat([...new Array(COUNT)].map(() => ({ loading: true, name: {} }))));
        this.getData(res => {
            const data = this.state.data.concat(res.results);
            this.setState(
                {
                    data,
                    list: data,
                    loading: false,
                },
                () => {
                    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                    // In real scene, you can using public method of react-virtualized:
                    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                    window.dispatchEvent(new Event('resize'));
                },
            );
        });
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    return (
        <div className="album">
            <Line {...config} />

            <List
                className="demo-loadmore-list"
                // loading={initLoading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        size="large"
                        actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.avatar} />
                                }
                                title={<h5 href="https://ant.design">{item.title}</h5>}
                                description={item.creator}
                            />
                            <div>content</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    )
}
