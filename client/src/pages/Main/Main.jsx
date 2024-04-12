import Banner from "../../components/Banner/Banner";
import Menu from "../../components/Menu/Menu";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import Profile from "../../components/Profile/Profile";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import GroupPic from '../../assets/images/GroupPic.png'
import envelope from '../../assets/images/envelope.png'
import arrowRight from '../../assets/images/arrowRight.png'
import MainVideo from '../../assets/images/MainVideo.png'
import logoYoutube from '../../assets/images/logoYoutube.png'
import './Main.css'
import { useNavigate } from "react-router-dom";
import Introduce from "../../components/Introduce/Introduce";
import { useEffect, useState } from "react";
import { fetchCounsel } from "../../service/counselService";
import Loading from "../../components/Loading/Loading";

const Main = ()=>{
    return (
      <div className="Main">
        <Banner />
        <div className="container">
          <SearchWrap />
          <Menu />
          <div className="relativeSection">
            <div>
              <Profile />
            </div>
            <div>
              <Introduce />
            </div>
          </div>
          <Address />
          <Category />
          <p className="CategoryTitle mb_dn">빠르게 상담 신청하기</p>
          <Counsel />
          <NewCounsel />
          <Youtube />
        </div>
      </div>
      )
}

const Address = ()=>{
  return(
    <div className='Address'>
      <div className="AddressImgWrap">
        <img src={ GroupPic } alt="법무법인 법과사람들" />
      </div>
      <div className="AddressTextWrap">
        <div className="AddressWrap">
            <p className="AddressText">인천광역시 미추홀구 소성로 159 (학익동) 201호</p>
            <div>
              <p className="PhoneNum">032-873-2211</p>
              <CopyToClipboard text="인천광역시 미추홀구 소성로 159 (학익동) 201호" onCopy={() => alert("클립보드에 복사되었습니다.")}>
                <text className="CopyBtn">주소 복사하기</text>
              </CopyToClipboard>
            </div>
        </div>
        <a className="AboutBtn" href="/about">사무소 소개</a>
      </div>
    </div>
  )
}
const Category = ()=>{
  const navigate = useNavigate();
  return(
    <div className='Category'>
      <p className="CategoryTitle">법률 분야</p>
      <div className="CategoryLists">
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '손해배상' })
        }}>
          <p>손해배상</p><span className="orange">전문분야</span>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '산재' })
        }}>
          <p>산재</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '부동산/임대차' })
        }}>
          <p>부동산/임대차</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '금전/계약문제' })
        }}>
          <p>금전/계약문제</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '교통사고' })
        }}>
          <p>교통사고</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '명예훼손/모욕' })
        }}>
          <p>명예훼손/모욕</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '폭행/협박/상해일반' })
        }}>
          <p>폭행/협박/상해일반</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '사기/공갈' })
        }}>
          <p>사기/공갈</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '성폭력/강제추행' })
        }}>
          <p>성폭력/강제추행</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '이혼' })
        }}>
          <p>이혼</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '기타 민사' })
        }}>
          <p>기타 민사</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '기타 형사' })
        }}>
          <p>기타 형사</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '의료/지식재산/금융' })
        }}>
          <p>의료/지식재산/금융</p>
        </div>
        <div className='CategoryList' onClick={()=>{
          navigate('/search', { state: '행정' })
        }}>
          <p>행정</p>
        </div>
      </div>
  </div>
  )
}
const Counsel = ()=>{
  const navigate = useNavigate()
  return(
    <div className="Counsel" onClick={()=>{
      navigate('/counsel/write')
    }}>
      <div>
        <div>
          <p className="CounselText01">상담 신청하기</p>
          <img src={ arrowRight } alt="arrowRight" />
        </div>
        <p className="CounselText02">간단한 정보만으로 온라인에서<br />상담 신청 접수가 가능해요</p>
      </div>
      <img src={ envelope }alt="envelope" />
    </div>
  )
}
const NewCounsel = ()=>{
  const [ data, setData ] = useState([])
  useEffect(()=>{
    const loadData = async ()=>{
      await fetchCounsel().then(response => {
        setData(response.data.slice(0, 4))
      })
    }
    loadData()
  },[])

  return(
    <div className="NewCounsel">
      <p className="CategoryTitle">신규상담</p>
      {
        !data
        ? <Loading />
        : <>
          {
            data.map((a, i)=>
              <div className="NewCounselList">
                <a href={`/counsel/${a._id}`} className="NewCounselTitle">{ a.title }</a>
                <p className="NewCounselCategory">{ a.category }</p>
              </div>
            )
          }
        </>
      }
    </div>
  )
}
const Youtube = ()=>{
  const navigate = useNavigate()
  return(
    <div className="Youtube">
      <p className="CategoryTitle">법률 동영상</p>
      <div onClick={()=>{
        navigate('/video/6492767271d740523332e8e8')
      }}>
        <img className="MainVideo" src={ MainVideo } alt="MainVideo" />
      </div>
      <img className="logoYoutube" src={ logoYoutube } alt="logoYoutube" />
    </div>
  )
}
export default Main;