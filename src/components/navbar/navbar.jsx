
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link} from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className='navbar'>
            <h4 style={{marginLeft:"35px",letterSpacing:'10px',color:'aliceblue'}}></h4>
            <div>
                <Button><Link to='/admin'><AccountCircleOutlinedIcon/><p style={{margin:"0"}}>Admin</p></Link></Button>
            </div>
        </div>
    )
}
