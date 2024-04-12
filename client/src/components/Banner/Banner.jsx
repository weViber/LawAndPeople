import './Banner.css'
import banner01 from '../../assets/images/banner01.png'
import banner02 from '../../assets/images/banner02.png'
import banner03 from '../../assets/images/banner03.png'
import banner04 from '../../assets/images/banner04.png'
import banner05 from '../../assets/images/banner05.png'
import banner06 from '../../assets/images/banner06.png'

const Banner = ({ banner })=>{
    const bannerImg = ()=>{
        if(!banner){
            return <img src={ banner01 } alt="" />
        }
        if(banner === 'banner02'){
            return <img src={ banner02 } alt="" />
        }
        if(banner === 'banner03'){
            return <img src={ banner03 } alt="" />
        }
        if(banner === 'banner04'){
            return <img src={ banner04 } alt="" />
        }
        if(banner === 'banner05'){
            return <img src={ banner05 } alt="" />
        }
        if(banner === 'banner06'){
            return <img src={ banner06 } className='banner06Img' alt="" />
        }
    }
    return(
        <div className='Banner'>
            <div className="BannerText container">
                <h2>법과 사람이 조화로운 세상<span className="orange">.</span></h2>
                <h2><span className="orange">법무법인 법과사람들</span>이<br /> 만들어갑니다</h2>
            </div>
            <div className="BannerImg">
                { bannerImg() }
            </div>
        </div>
    )
}
export default Banner