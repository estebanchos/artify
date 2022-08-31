import { Avatar, List, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../styles/BrowseArt.module.css'
const { Option } = Select


export default function BrowseArt() {
    const [artists, setArtists] = useState([])
    const [selectedArtistId, setSelectedArtistId] = useState(null)
    const [artistPortfolio, setArtistPortfolio] = useState([])

    useEffect(() => {
        fetchAllArtists()
    }, [])

    useEffect(() => {
        if (selectedArtistId) fetchArt(selectedArtistId)
    }, [selectedArtistId])

    const fetchArt = (id) => {
        axios.get(`/api/art/artist/${id}`)
            .then(res => {
                setArtistPortfolio(res.data.artistPortfolio)
            })
            .catch(err => console.error(err))
    }

    const fetchAllArtists = () => {
        axios.get('/api/art/artist')
            .then(res => {
                setArtists(res.data)
            })
            .catch(err => console.error(err))
    }

    const onArtistChange = (value) => {
        setSelectedArtistId(value);
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Explore art on Artify</h2>
            <div className={styles.exploreContainer}>
                <Select
                    showSearch
                    size="large"
                    placeholder="Select an artist"
                    optionFilterProp="children"
                    onChange={onArtistChange}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                    {artists?.map(artist => {
                        return (
                            <Option key={artist.id} value={artist.id}>{artist.name}</Option>
                        )
                    })}
                </Select>
            </div>
            {artistPortfolio.length < 1 ? ''
                :
                <div className={styles.portfolioContainer}>
                    <List
                        itemLayout="horizontal"
                        size="large"
                        dataSource={artistPortfolio}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" size='large' src={item.imageSrc} />}
                                    title={item.title}
                                    description={`Creation date: ${item.creationDate}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>}
        </section>
    )
}