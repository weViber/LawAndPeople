import './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faX } from '@fortawesome/free-solid-svg-icons'
import mainlogo from '../../assets/images/mainlogo.png'

const SideBar = ({ sideBar, setSideBar })=>{
    const handleSideBar =()=>{
        setSideBar(!sideBar)
    }
    return(
        <div className={
            !sideBar
            ? "SideBar"
            : "SideBar SideBarActive"
        }>
            <div className='btnWrap'>
                <button className='sideCloseBtn' onClick={ handleSideBar }><FontAwesomeIcon icon={ faX } /></button>
            </div>
            <img className='logo' src={ mainlogo } alt="mainlogo" />
            <a className='menu' href="/about">- 사무소 소개</a>
            <a className='menu' href="/counsel">- 상담 사례</a>
            <a className='menu' href="/cases">- 해결 사례</a>
            <a className='menu' href="/guide">- 법률 가이드</a>
            <a className='menu' href="/video">- 법률 동영상</a>
            <hr className='borderTop' />
            <a className='menu' href="https://m.blog.naver.com/PostList.naver?blogId=lawandpeople1"><FontAwesomeIcon className='LinkIcon' icon={ faLink } /> 우희창 변호사 블로그</a>
            <a className='menu' href="https://www.lawtalk.co.kr/directory/profile/0166-%EC%9A%B0%ED%9D%AC%EC%B0%BD/review?pg=main.total&source=total_n&position=0&sc=normal"><FontAwesomeIcon className='LinkIcon' icon={ faLink } /> 로톡 의뢰후기</a>
            <hr className='borderTop' />
            <a className='counsel' href="/counsel/write">상담 신청하기</a>
        </div>
    )   
}
export default SideBar;