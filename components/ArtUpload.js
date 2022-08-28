import axios from "axios"
import { useState } from "react"

function ArtUpload() {
    const [title, setTitle] = useState('')
    const [creationDate, setCreationDate] = useState('')

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
                creationDate: String(creationDate),
                imageSrc: imageSrc
            }
        )

    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='' htmlFor='title'>Title</label>
                    <input
                        id='title'
                        name='title'
                        className=''
                        placeholder='Mona Lisa'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoCapitalize='none'
                    />
                </div>
                <div>
                    <label className='' htmlFor='creationDate'>Creation Date</label>
                    <input
                        id='creationDate'
                        name='creationDate'
                        className=''
                        placeholder='15-02-1503'
                        value={creationDate}
                        onChange={(e) => setCreationDate(e.target.value)}
                        autoCapitalize='none'
                    />
                </div>
                <div>
                    <label className='' htmlFor='image'>Creation Date</label>
                    <input
                        id='image'
                        name='image'
                        type='file'
                        className=''
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button>Upload Image</button>
            </form>
        </section>
    );
}

export default ArtUpload;