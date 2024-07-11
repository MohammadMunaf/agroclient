import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"
import './edit.css'
import { baseUrl } from "../../url";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function EditPage() {
    let location = useLocation();
    const id = location.state ? location.state.id : "Invalid";
    const [image, setimage] = useState([]);
    const [editData, setEditData] = useState({
        id: "",
        Name: "",
        Description: "",
        images: [],
        price: "",
        category: ""
    })
    useEffect(() => {
        axios.get(`${baseUrl}/edit/${id}`)
            .then((res) => {
                setEditData({
                    id: res.data.id || "",
                    Name: res.data.name || "",
                    Description: res.data.description || "",
                    price: res.data.price || "",
                    category: res.data.category || ""
                })
                setimage(res.data.images);
                //console.log(res);
            })
            .catch((e) => {
                console.log(`Error-->${e}`);
            })
    }, [])
    const handleChange = (evt) => {
        const { name, value} = evt.target;
            setEditData(currData => ({
                ...currData,
                [name]: value,
            }))
    }
    const handleSubmit = () => {
        image.forEach((ele)=>{
            editData.images.push(ele);
        })
        // editData.images=image;
        axios.patch(`${baseUrl}/edit/${id}`, editData)
            .then((res) => {
                setEditData({
                    id:"",
                    Name:"",
                    Description: "",
                    images: [],
                    price:"",
                    category: ""
                })
                setimage([]);
            })
            .catch((e) => {
                console.log(`Error-->${e}`);
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
                    setimage([...image, result.info.secure_url])
                }
            },
        ).open();
    };
    const handleDeleteImage = (url) => {
        //remove url from image array
        const tempArray = image.filter((ele) =>  ele !== url );
        setimage(tempArray);
    }
    return (
        <div className="editPage">
            
                <form className='editFormBox' encType='multipart/form-data'>
                    <h2 style={{ textAlign: 'center', color: 'rgb(29, 58, 81)' }}>Edit Product</h2>
                    <div>
                        <TextField id="Name" name="Name" value={editData.Name}
                            onChange={handleChange} label="Product Title" variant="outlined" size="small" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField id="Description" name="Description" value={editData.Description}
                            onChange={handleChange} label="Description" variant="outlined" size="small" style={{ width: '100%', marginTop: '10px' }} />
                    </div>
                 
                    <div className='priceBox'>
                        <div>
                            <TextField id="price" name="price" value={editData.price}
                                onChange={handleChange} label="price" variant="outlined" size="small" style={{ width: '99%', marginTop: '10px' }} />
                        </div>
                        <div>
                        <InputLabel id="category" sx={{fontSize:'10px',margin:0,marginLeft:'8px',marginBottom:'-8px'}}>category</InputLabel>
                            <Select
                                // labelId="category"
                                // id="category"
                                value={editData.category}
                                onChange={handleChange}
                                name="category"
                                sx={{ m: 1, width: 192,height:34 ,margin:0,marginTop:1,color:'black'}}
                                
                            >
                                <MenuItem value="Chinos">Chinos</MenuItem>
                                <MenuItem value='Jeans'>Jeans</MenuItem>
                                <MenuItem value='Boots'>Boots</MenuItem>
                                <MenuItem value='Tshirt'>Tshirts</MenuItem>
                                <MenuItem value='Shirts'>Shirts</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="imageUploader">
                        <Button type="Button" disabled={image.length >= 3 ? true : false} className="btn-widget-btn" onClick={openWidget}>Upload image {image.length}</Button>
                        <p style={{ marginTop: '-1px', fontSize: '12px', color: 'grey' }}>max 3 images is allowed</p>
                        {image.map((ele) => (
                            <img src={ele} onClick={() => handleDeleteImage(ele)} alt="" style={{ width: "50px" }} />
                        ))}
                    </div>
                    <Button onClick={handleSubmit} style={{ width: '100%', backgroundColor: 'green', color: 'white' }}>Edit</Button>
                </form>
           
        </div>
    )
}