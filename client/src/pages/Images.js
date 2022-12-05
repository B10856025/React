import 'css/style.scss';
import { useState } from 'react';
import axios from 'axios';

function Images() {
    const [image,setImage] = useState('');

    const handleChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const handleApi = () => {
        const url = '/api/image'
        const formData = new FormData()
        formData.append('image', image)
        axios.post(url, formData).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log('----------error', error)
        })
    }
    return (
    <div >
        <img width={100} src={image === '' ? '' : URL.createObjectURL(image)} alt={image}/>
        IMAGE upload
        <input type="file" onChange={handleChange} />
        <button onClick={handleApi}>Submit</button>
    </div>
    ) ;
}

export default Images;

