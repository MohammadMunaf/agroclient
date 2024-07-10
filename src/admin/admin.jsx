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
                    <Button><Link to={`/upload`} style={{ textDecorationLine: 'none' }}>upload</Link></Button>
                    <Button><Link to={`/adminProductList`} style={{ textDecorationLine: 'none' }}>uploaded Products</Link></Button>
                    <Button><Link to={`/`} style={{ textDecorationLine: 'none' }}>Product List</Link></Button>
                </div>
            </div>
        </div>
    )
}