import axios from "axios"
import { useState } from "react"
import { Button, DatePicker } from 'antd';
import { UploadOutlined, PictureOutlined, CheckCircleOutlined } from '@ant-design/icons'
import styles from '../styles/ArtUpload.module.css'

function ArtUpload() {
    const [title, setTitle] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [imageName, setImageName] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const fileInput = Array.from(form.elements).find(({ type }) => type === 'file')

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
                creationDate: String(creationDate),
                imageSrc: imageSrc
            }
        )
            .then(_res => {

            })
            .catch(err => console.error(err))
    }

    const onChangeImage = (e) => {
        setImageName(e.target.files[0]?.name)
    }

    return (
        <section className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor='title'>Art Title</label>
                    <input
                        id='title'
                        name='title'
                        className={styles.titleInput}
                        placeholder='Mona Lisa'
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
                        placeholder="Choose Image"
                        className={styles.imageInput}
                        onChange={onChangeImage}
                    />
                    <label className={styles.labelImage} htmlFor='image'><PictureOutlined /> Choose Image</label>
                    {imageName ?
                        <span className={styles.imageName}><span className={styles.successIcon}><CheckCircleOutlined /></span>{imageName}</span>
                        : ''}
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        onClick={handleSubmit}
                        shape="round"
                        icon={<UploadOutlined />}
                        size='large'
                    >
                        Upload
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default ArtUpload;