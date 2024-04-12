import { Link } from "react-router-dom";
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import mainlogo from '../../assets/images/mainlogo.png'

const Header = ({ sideBar, setSideBar })=>{
    const handleSideBar =()=>{
        setSideBar(!sideBar)
    }
    return(
        <div id="Header">
            <div className="container">
                <button className="sideBarBtn" onClick={ handleSideBar }><FontAwesomeIcon icon={ faBars } /></button>
                <Link className="Logo" to='/'>
                    <img src={ mainlogo } alt="mainlogo" />
                </Link>  
                <div className="menu">
                    <Link to='/counsel/write'>상담 신청</Link>
                    <Link to='/counsel'>상담 사례</Link>
                    <Link to='/cases'>해결 사례</Link>
                    <Link to='/guide'>법률 가이드</Link>
                    <Link to='/video'>법률 동영상</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;