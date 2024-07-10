import Axios from 'axios';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import './upload.css';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function Upload() {
    const [image, setImage] = useState([]);
    const [formData, setformData] = useState({
        Name: "",
        Description: "",
        images: [],
        price: "",
        category: "",
        brand: ""
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setformData(currData => ({
            ...currData,
            [name]: value,
        }))

    }
    const handleSubmit = async (event) => {
        for (let img of image) {
            formData.images.push(img);
        }
        console.log(formData);
        Axios.post(`http://localhost:3001/upload`, formData)
            .then((response) => {
                console.log(response);
                setformData({
                    Name: "",
                    Description: "",
                    images: [],
                    price: "",
                    category: "",
                    brand: "",
                })
                setImage([]);
            }).catch((e) => {
                console.log(`error-->${e}`);
            })
    }
    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dl6otmbjy',
                uploadPreset: 'tzmfkpmg',
                max_files: '1',
            },
            (error, result) => {
                if (result.event === 'success') {
                    //console.log(result.info.secure_url);
                    setImage([...image, result.info.secure_url])
                }
            },
        ).open();
    };
    return (
        <div className='uploadForm'>
            {/* <Navbar /> */}
            <div className='formBox'>
                <form className='uploadFormBox' encType='multipart/form-data'>
                    <h2 style={{ textAlign: 'center', color: 'rgb(29, 58, 81)' }}>Upload New Product</h2>
                    <div>
                        <TextField id="Name" name="Name" value={formData.Name}
                            onChange={handleChange} label="Product Title" variant="outlined" size="small" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField id="Description" name="Description" value={formData.Description}
                            onChange={handleChange} label="Description" variant="outlined" size="small" style={{ width: '100%', marginTop: '10px' }} />
                    </div>
                    <div>
                        <TextField id="brand" name="brand" value={formData.brand}
                            onChange={handleChange} label="brand" variant="outlined" size="small" style={{ width: '100%', marginTop: '10px' }} />
                    </div>
                    <div className='priceBox'>
                        <div>
                            <TextField id="price" name="price" value={formData.price}
                                onChange={handleChange} label="price" variant="outlined" size="small" style={{ width: '99%', marginTop: '10px' }} />
                        </div>
                        <div>
                        <InputLabel id="category" sx={{fontSize:'10px',margin:0,marginLeft:'8px',marginBottom:'-8px'}}>category</InputLabel>
                            <Select
                            labelId="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                name="category"
                                sx={{ m: 1, width: 192,height:34 ,margin:0,marginTop:1}}
                                //label="category"
                            >
                                <MenuItem value="Chinos">Chinos</MenuItem>
                                <MenuItem value='Jeans'>Jeans</MenuItem>
                                <MenuItem value='Boots'>Boots</MenuItem>
                                <MenuItem value='Tshirt'>Tshirts</MenuItem>
                                <MenuItem value='Shirts'>Shirts</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className='imageUploader'>
                        <Button type="button" disabled={image.length >= 3 ? true : false} className="btn-widget-btn" onClick={openWidget}>Upload image {image.length}</Button>
                        <p style={{ marginTop: '-1px', fontSize: '12px', color: 'grey' }}>max 3 images is allowed</p>
                        {image.map((ele) => (
                            <img src={ele} alt="" style={{ width: "50px" }} />
                        ))}
                    </div>
                    <Button onClick={handleSubmit} style={{ width: '100%', backgroundColor: 'green', color: 'white' }}>Add</Button>
                </form>
            </div>
        </div>
    )
}