import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './admin.css'
export default function Admin() {
    return (
        <div className='adminBody'>
            <div className='AdminContent'>
                <div>
                    <AccountCircleOutlinedIcon style={{ fontSize: '90px', backgroundColor: 'white' }}></AccountCircleOutlinedIcon>
                    <h2>Admin</h2>
                </div>
                <div >
                    <Button><Link to={`http://localhost:3000/upload`} style={{ textDecorationLine: 'none' }}>upload</Link></Button>
                    <Button><Link to={`http://localhost:3000/adminProductList`} style={{ textDecorationLine: 'none' }}>uploaded Products</Link></Button>
                    <Button><Link to={`http://localhost:3000/`} style={{ textDecorationLine: 'none' }}>Product List</Link></Button>
                </div>
            </div>
        </div>
    )
}