import { Link } from 'react-router-dom'
import './MobileMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFileLines, faFileWord, faPager, faPhone } from '@fortawesome/free-solid-svg-icons'

const MobileMenu = ()=>{
    return(
        <div className="MobileMenu">
            <div>
                <a href="tel:032-873-2211">
                    <FontAwesomeIcon icon={ faPhone } />
                    <p>전화 상담</p>
                </a>
            </div>
            <div>
                <a href="/counsel/write">
                    <FontAwesomeIcon icon={ faFileLines } />
                    <p>상담 신청</p>
                </a>
            </div>
        </div>
    )
}
export default MobileMenu