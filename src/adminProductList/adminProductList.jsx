import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './adminProductList.css'
import Axios from 'axios';
import ManIcon from '@mui/icons-material/Man';
import { useNavigate } from 'react-router-dom';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import Checkbox from '@mui/material/Checkbox';
import Navbar from '../components/navbar/navbar';
import WebhookIcon from '@mui/icons-material/Webhook';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import { baseUrl } from '../url';


export default function AdminProductList() {
    const navigate = useNavigate();
    const [buttonClick, setButtonClick] = useState({
        click: '0',
        button: "",
    });
    const [mp, setmp] = useState(new Map([
        ["Chinos", { BackgroundColor: 'white', Color: 'rgb(82, 81, 81)' }],
        ["Jeans", { BackgroundColor: 'white', Color: 'rgb(82, 81, 81)' }],
        ["Boots", { BackgroundColor: 'white', Color: 'rgb(82, 81, 81)' }],
        ["Shirt", { BackgroundColor: 'white', Color: 'rgb(82, 81, 81)' }],
        ["Tshirt", { BackgroundColor: 'white', Color: 'rgb(82, 81, 81)' }],
    ]));

    const [allproduct, setallproduct] = useState([]);
    const [alldata, setallData] = useState([]);
    const [Arrangedata, setArrangeData] = useState("");
    const fetchData = (value) => {
        Axios.get(`${baseUrl}/products/?q=${value}`)
            .then((response) => {
                setallproduct(response.data);
                setallData(response.data);
            })
            .catch((e) => {
                console.error(`error-->${e}`);
            });
    }
    useEffect(() => {
        fetchData("All");
        window.scrollTo(0, 0);
    }, []);

    const updateButtonValue = (category) => {
        let prevButton = buttonClick.button;
        if (prevButton === category) {
            setmp(
                mp.set(category, { BackgroundColor: 'white', Color: 'rgb(82, 81, 81)' })
            )
            setButtonClick(
                { click: '0', button: "" }
            )
            fetchData("All");
        } else {
            fetchData(category);
            if (buttonClick.click === '0') {
                setmp(
                    mp.set(category, { BackgroundColor: 'rgb(29, 58, 81)', Color: 'white' })
                )
                setButtonClick(
                    { click: '1', button: category }
                )
            } else {
                setmp(
                    mp.set(category, { BackgroundColor: 'rgb(29, 58, 81)', Color: 'white' })
                )
                setmp(
                    mp.set(prevButton, { BackgroundColor: 'white', Color: 'rgb(82, 81, 81)' })
                )
                setButtonClick(
                    { click: '1', button: category }
                )
            }
        }

    }
    const arrangeData = (val) => {
        let product = [];
        if (Arrangedata === val) {
            setArrangeData("");
            product = alldata;
        }
        else {
            setArrangeData(val);

            switch (val) {
                case "a":
                    //less then 500  .
                    product = alldata.filter((p) => p.price < 500);
                    // console.log(product);
                    break;
                case "b":
                    //499-999
                    product = alldata.filter((p) => p.price > 500 && p.price < 1000);
                    // console.log(product);
                    break;
                case "c":
                    //1000-1599
                    product = alldata.filter((p) => p.price > 1000 && p.price < 1599);
                    // console.log(product);
                    break;
                case "d":
                    //1500-1999 
                    product = alldata.filter((p) => p.price > 1500 && p.price < 1999);
                    // console.log(product);
                    break;
                case "e":
                    //above 2000   
                    product = alldata.filter((p) => p.price > 2000);
                    break;
                default:
                    break;
            }
        }
        setallproduct(product);
    }
    const changeOrder = (val) => {
        let product = [...allproduct];
        product.sort((a, b) => a.price - b.price);
        setallproduct(product);
    }
    const handleEdit=(id)=>{
        navigate('/edit',{state:{id:id}});
    }
    return (
        <div>
            <Navbar/>
            <div className='collections'>
             
                <div className='collectionContent'>
                    <div className='sideBar'>
                        <div className='catogory1' style={{ textAlign: "left" }}>
                            <h2 style={{ fontSize: '30px' }}>Catogeries</h2>
                            <button
                                onClick={() => updateButtonValue("Chinos")}
                                style={{
                                    backgroundColor: mp.get("Chinos").BackgroundColor,
                                    color: mp.get("Chinos").Color
                                }}
                            >

                                <ManIcon style={{ marginBottom: '-5px', width: '2em' }} />
                                Chinos
                            </button>
                            <button
                                onClick={() => updateButtonValue("Jeans")}
                                style={{
                                    backgroundColor: mp.get("Jeans").BackgroundColor,
                                    color: mp.get("Jeans").Color
                                }}
                            >
                                <WebhookIcon style={{ marginBottom: '-5px', width: '2em' }} />
                                Jeans
                            </button>
                            <button
                                onClick={() => updateButtonValue("Boots")}
                                style={{ backgroundColor: mp.get("Boots").BackgroundColor, color: mp.get("Boots").Color }}
                            >
                                <SnowshoeingIcon style={{ marginBottom: '-5px', width: '2em' }} />
                                Boot
                            </button>
                            <button
                                onClick={() => updateButtonValue("Shirt")}
                                style={{ backgroundColor: mp.get("Shirt").BackgroundColor, color: mp.get("Shirt").Color }}
                            >
                                <CandlestickChartIcon style={{ marginBottom: '-5px', width: '2em' }} />
                                Shirt
                            </button>
                            <button
                                onClick={() => updateButtonValue("Tshirt")}
                                style={{ backgroundColor: mp.get("Tshirt").BackgroundColor, color: mp.get("Tshirt").Color }}>
                                <BubbleChartIcon style={{ marginBottom: '-5px', width: '2em' }} />
                                Tshirt
                            </button>
                        </div>
                        <div className='catogory2' style={{ marginTop: '20px', textAlign: "left" }}>
                            <h2 style={{ fontSize: '26px' }}>Filter By Price</h2>
                            <button onClick={() => arrangeData("a")} id='500'><label><Checkbox for='500' checked={Arrangedata === "a"} />less then 500</label></button>
                            <button onClick={() => arrangeData("b")} id='999'><label><Checkbox for='999' checked={Arrangedata === "b"} />499-999</label></button>
                            <button onClick={() => arrangeData("c")} id='1599'><label><Checkbox for='1599' checked={Arrangedata === "c"} />1000-1599</label></button>
                            <button onClick={() => arrangeData("d")} id='1999'><label><Checkbox for='1999' checked={Arrangedata === "d"} />1500-1999</label></button>
                            <button onClick={() => arrangeData("e")} id='2000'><label><Checkbox for='2000' checked={Arrangedata === "e"} />above 2000</label></button>
                        </div>
                    </div>
                    <div className='productList'>
                        <div>
                            <h2 style={{ fontSize: '26px' }}>Admin Products List</h2>
                            <Button onClick={() => changeOrder("price")}>sort price</Button>
                        
                        </div>
                        <div className='productContainer'>
                            {Array.isArray(allproduct) && allproduct.map(product => (
                                <Card sx={{ width: 250, height: 350, boxShadow: 'none', marginRight: '49px' }} className='product' key={product._id}>
                           
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="265"
                                            image={product.images[0]}
                                        />
                                        <div className="newArrivalProductDetails" style={{ color: 'GrayText', textAlign: 'center' }}>
                                            <span>
                                                <p style={{ margin: '3px', maxHeight: '18.5px', marginTop: '10px' }}>{product.name}</p>
                                                <h2 style={{ margin: '3px', color: 'rgb(29, 58, 81)' }}><CurrencyRupeeIcon style={{ fontSize: '15px' }} />{product.price}</h2>
                                            </span>
                                        </div>
                        
                                    <Button onClick={()=>handleEdit(product._id)} style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', width: '2%', height: '2%',fontSize:'9px'}}>Edit</Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}

        </div>
    )
}



