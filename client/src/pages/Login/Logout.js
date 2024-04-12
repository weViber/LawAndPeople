import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user';
import './Logout.css'

const Logout = ()=>{
    const dispatch = useDispatch()
    const LogoutBtn = ()=>{
        dispatch(logout())
    }
    return(
        <div className='Logout'>
            <h2>관리자 모드</h2>
            <button onClick={ LogoutBtn }>로그아웃</button>
        </div>
    )
}
export default Logout