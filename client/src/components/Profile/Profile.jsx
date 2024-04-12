import './Profile.css'
import ProfileImg from '../../assets/images/ProfileImg.png'

const Profile = ()=>{
    return(
        <div className='Profile'>
            <div>
                <div>
                    <p className='ProfileText01'>대표 변호사</p>
                    <p className='ProfileText02'>우희창입니다<span className='orange'>.</span></p>
                </div>
                <div className='ProfileText03'>
                    <p>대한협회 등록 손해배상전문</p>
                </div>
                <a className='ProfileBtn' href="/counsel/write">상담신청하기</a>
            </div>
            <div>
                <div className='ProfileImg'>
                    <img alt="ProfileImg" src={ ProfileImg } />
                </div>
            </div>
        </div>
    )
}
export default Profile;