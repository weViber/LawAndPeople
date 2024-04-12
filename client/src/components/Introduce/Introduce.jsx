import { useEffect, useState } from "react";
import './Introduce.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Introduce =()=>{
    const [ status, setStatus ] = useState('기사')
    const [ news, setNews ] = useState([{
      company : '로톡뉴스',
      createdAt : ' 2022.08.24',
      title : '편의점 주인 폭행해 ‘실명 위기’ 만든 중학생…위자료는 얼마?',
      url : 'https://post.naver.com/viewer/postView.naver?volumeNo=34363166&memberNo=47450257'
    }, {
      company : '로톡뉴스',
      createdAt : ' 2022.03.08',
      title : '공무원 실수로 사라진 ‘내 투표권’…국가가 보상해야….',
      url : 'https://lawtalknews.co.kr/article/7XNEMIBOB9LO'
    },{
      company : 'JTBC',
      createdAt : ' 2021.08.15',
      title : '[이런법이] 성범죄 맞서다 가해자 다치면?…’정당방위’ 달….',
      url : 'https://news.nate.com/view/20210815n14025'
    },{
      company : '법률방송뉴스',
      createdAt : ' 2021.02.18',
      title : '57년 전 ‘혀 절단’ 재심청구 기각… 박준영 변호사 “검찰총….',
      url : 'https://www.ltn.kr/news/articleView.html?idxno=30914'
    },
  ])
    const [ records, setRecords ] = useState([{
      years : '2008',
      contents : '성균관대학교 법학과 학사 졸업'
    },{
      years : '2015',
      contents : '카이스트(KAIST) 지식재산대학원 석사 졸업'
    },{
      years : '2015',
      contents : '사법시험 53회 합격'
    },{
      years : '2019',
      contents : '법무법인 법과사람들 대표변호사'
    },{
      years : '2020',
      contents : '서울보증보험 협약변호사'
    },{
      years : '2013',
      contents : '인천지방법원 조정위원'
    },{
      years : '2015-2015',
      contents : '부천행동강령 자문위원'
    },{
      years : '2014',
      contents : '인천예총 고문변호사'
    },{
      years : '2014-2019',
      contents : '법무법인 새얼'
    },{
      years : '2019',
      contents : '주식회사 뉴트리메디 대표이사'
    },{
      years : '2019',
      contents : '서초경찰서 고문변호사'
    },{
      years : '2015-2019',
      contents : '부천시 행동강령자문위원'
    }])
    return(
      <div className="Introduce">
        <div className="ControlBar" >
          <div onClick={()=>{
            setStatus('기사')
          }} className=          {
            status === '기사'
            ? 'ControlNews Active'
            : 'ControlNews'
          }>
            <p>관련기사</p>
          </div>
          <div onClick={()=>{
            setStatus('약력')
          }} className= {
            status === '약력'
            ? 'ControlRecord Active'
            : 'ControlRecord'
          }>
            <p>약력 자세히 보기</p>
          </div>
        </div>
        <div className="Contents">
          {
            status === '기사'
            ? <News news={ news } />            
            : <Record records={ records }/>
          }
        </div>
      </div>
    )
}
const News =({ news })=>{
  return(
    <div className="newsList">
      {
        !news
        ? null
        : <>
        {
          news.map((a, i)=>{
            return(
              <div className="newsList" key={ i }>
                <div className="newsHead">
                  <p>{ a.company }</p>
                  <p>{ a.createdAt }</p>
                </div>
                <a href={ a.url } className="newsBody">{ a.title }</a>
              </div>
            )
          })
        }
        </>
      }
    </div>
  )
}
const Record =({ records })=>{
  const [ more, setMore ] = useState(false)
  const [ filtered, setFiltered ] = useState(records.slice(0, 5))

  const handleMore = ()=>{
    setMore(!more)
  }
  useEffect(()=>{
    if(more){
      setFiltered(records)
    } else {
      setFiltered(records.slice(0, 5))
    }
  }, [more])

  return(
    <div className="recordLists">
      {
        !filtered
        ? null
        : <>
        {
          filtered.map((a, i)=>{
            return(
              <div className="recordList">
                <p className="recordYear">{ a.years } -</p><p className="recordContent">{ a.contents }</p>
              </div>
            )
          })
        }
        </>
      }
      {
        !more
        ? <p className="moreBtn" onClick={ handleMore }>약력 더보기 <FontAwesomeIcon icon={ faChevronDown } /></p>
        : <p className="closeBtn" onClick={ handleMore }>접기 <FontAwesomeIcon icon={ faChevronUp } /></p>
      }
    </div>
  )
}
export default Introduce;