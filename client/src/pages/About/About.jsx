import './About.css'
import GroupPic from '../../assets/images/GroupPic.png'
import Banner from '../../components/Banner/Banner'
import Line from "../../components/Line/Line";
import Menu from "../../components/Menu/Menu";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import Man from '../../assets/images/Man.png'
import Woman from '../../assets/images/Woman.png'
import KimJongYul from '../../assets/images/KimJongYul.png'
import WooHeeChang from '../../assets/images/WooHeeChang.png'
import ChoiKyungJa from '../../assets/images/ChoiKyungJa.png'
import HanGwangTae from '../../assets/images/HanGwangTae.png'
import JoHyunYoung from '../../assets/images/JoHyunYoung.png'
import JwonJaeWon from '../../assets/images/JwonJaeWon.png'
import KimHyungGi from '../../assets/images/KimHyungGi.png'
import KimMiJin from '../../assets/images/KimMiJin.png'
import KimSuJin from '../../assets/images/KimSuJin.png'

const About = ()=>{
    return(
        <div className="About">
            <Banner />
            <div className='container'>
                <SearchWrap />
                <Menu />
                <Line />
                <div className="GroupImgWrap">
                    <img src={ GroupPic } alt="GroupPic" />
                </div>
                <div className="Memberlist">
                    <div className="Member Member1">
                        <div className="Members Members_1">
                            <p><img className="woohee" alt="woohee" src={ WooHeeChang } /></p>
                            <p><span>대표변호사</span></p>
                            <p>우희창</p>
                        </div>
                        <div className="Members Members_3">
                            <p><img className="man" alt="HanGwangTae" src={ HanGwangTae } /></p>
                            <p><span>실장</span></p>
                            <p>한광태</p>
                        </div>
                        <div className="Members Members_5">
                            <p><img className="women" alt="ChoiKyungJa" src={ ChoiKyungJa } /></p>
                            <p><span>사무장</span></p>
                            <p>최경자</p>
                        </div>
                        <div className="Members Members_7">
                            <p><img className="women" alt="KimSuJin" src={ KimSuJin } /></p>
                            <p><span>대리</span></p>
                            <p>김수진</p>
                        </div>
                        <div className="Members Members_9">
                            <p><img className="women" alt="KimMiJin" src={ KimMiJin } /></p>
                            <p><span>주임</span></p>
                            <p>김미진</p>
                        </div>
                    </div>
                    <div className="Member Member2">
                        <div className="Members Members_2">
                            <p><img className="kimjong" alt="kimjong" src={ KimJongYul } /></p>
                            <p><span>소속변호사</span></p>
                            <p>김종열</p>
                        </div>
                        <div className="Members Members_4">
                            <p><img className="man" alt="KimHyungGi" src={ KimHyungGi } /></p>
                            <p><span>실장</span></p>
                            <p>김형기</p>
                        </div>
                        <div className="Members Members_6">
                            <p><img className="man" alt="JwonJaeWon" src={ JwonJaeWon } /></p>
                            <p><span>과장</span></p>
                            <p>전재원</p>
                        </div>
                        <div className="Members Members_8">
                            <p><img className="women" alt="JoHyunYoung" src={ JoHyunYoung } /></p>
                            <p><span>대리</span></p>
                            <p>조현영</p>
                        </div>
                        <div className="Members Members_10">
                            <p></p>
                            <p><span></span></p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About
