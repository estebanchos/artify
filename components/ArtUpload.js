import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { DatePicker, notification } from 'antd';
import { UploadOutlined, PictureOutlined, CheckCircleOutlined } from '@ant-design/icons'
import styles from '../styles/ArtUpload.module.css'
import AppContext from "../context/AppContext";
import Head from "next/head";

const uploadNotification = (type) => {
    if (type === 'success') {
        notification[type]({
            message: 'Success!',
            description: 'Art has been uploaded successfully.'
        })
        return
    }
    notification['error']({
        message: 'Error!',
        description: 'The art was not uploaded.'
    })
}

function ArtUpload() {
    const [title, setTitle] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [imageName, setImageName] = useState(null)
    const [artists, setArtists] = useState([])
    const [artistId, setArtistId] = useState(null)

    const value = useContext(AppContext)
    const role = value.role

    useEffect(() => {
        fetchAllArtists()
    }, [])

    const fetchAllArtists = () => {
        axios.get('/api/art/artist')
            .then(res => {
                setArtists(res.data)
            })
            .catch(err => console.error(err))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.currentTarget
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'image')
        const formData = new FormData()

        for (const file of fileInput.files) {
            formData.append('file', file)
        }
        formData.append('upload_preset', 'artify');

        const data = await fetch('https://api.cloudinary.com/v1_1/estebanchos/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json())
        const imageSrc = data.secure_url
        e.target.image.value = ''

        axios.post('/api/art',
            {
                title: title,
                creationDate: creationDate,
                imageSrc: imageSrc,
                artistId: Number(artistId)
            }
        )
            .then(res => {
                if (res.data.success) {
                    uploadNotification('success')
                } else {
                    uploadNotification('error')
                }
                setTitle('')
                setCreationDate('')
                setImageName(null)
            })
            .catch(err => console.error(err))
    }

    const onChangeImage = (e) => {
        setImageName(e.target.files[0]?.name)
    }

    return (
        <>
            <section className={styles.formContainer}>
                <h2 className={styles.title}>Upload a piece of art</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {role === 'ARTIST' ?
                        ''
                        :
                        <div className={styles.inputContainer}>
                            <select
                                className={styles.dropdown}
                                name='artist'
                                id='artist'
                                value={artistId}
                                onChange={(e) => setArtistId(e.target.value)}
                            >
                                <option value='' disabled hidden>Select Artist</option>
                                {artists?.map((artist) => {
                                    return (
                                        <option
                                            className={styles.dropdownOptions}
                                            key={artist.id}
                                            value={artist.id}>
                                            {artist.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    }
                    <div className={styles.inputContainer}>
                        <label className={styles.label} htmlFor='title'>Art Title</label>
                        <input
                            id='title'
                            name='title'
                            className={styles.titleInput}
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoCapitalize='none'
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label} htmlFor='creationDate'>Creation Date</label>
                        <div className={styles.dateContainer}>
                            <DatePicker
                                onChange={(_date, dateString) => {
                                    setCreationDate(dateString);
                                }}
                                size='large'
                            />
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <span className={styles.label}>Image</span>
                        <input
                            id='image'
                            name='image'
                            accept="image/*"
                            type='file'
                            className={styles.imageInput}
                            onChange={onChangeImage}
                        />
                        <label className={styles.labelImage} htmlFor='image'><PictureOutlined /> Choose Image</label>
                        {imageName ?
                            <span className={styles.imageName}><span className={styles.successIcon}><CheckCircleOutlined /></span>{imageName}</span>
                            : ''}
                    </div>
                    <button className={styles.buttonContainer}>
                        <UploadOutlined /> Upload
                    </button>
                    {/* <div className={styles.buttonContainer}>
                </div> */}
                </form>
            </section>
        </>
    );
}

export default ArtUpload;