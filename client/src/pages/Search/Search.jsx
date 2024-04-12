import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import Banner from "../../components/Banner/Banner";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import Loading from "../../components/Loading/Loading";
import Menu from "../../components/Menu/Menu";
import { searchData } from "../../service/searchService";
import './Search.css'

const Search = ()=>{
    const { state } = useLocation();
    const [ loading, setLoading ] = useState(false)
    const [ cases, setCases ] = useState([])
    const [ guide, setGuide ] = useState([])
    const [ video, setVideo ] = useState([])
    const [ status, setStatus ] = useState('전체')

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            const res = await searchData({ keyword : state })
            setCases(res.data.resultCase)
            setGuide(res.data.resultGuide)
            setVideo(res.data.resultVideo)
            setLoading(false);
        }
        fetchData();
    }, [ state ])

    const result = ()=>{
        if(status === '전체'){
            return(
                <>
                    <CaseSection cases = { cases } state = { state } keyword = { state }/>
                    <GuideSection guide = { guide } state = { state } keyword = { state }/>
                    <VideoSection video = { video } state = { state } keyword = { state }/>
                </>
            )
        }
    }
    return(
        <div id="Search">
            <Banner banner="banner03"/>
            <div className="container">
                <SearchWrap state = { state }/>
                <Menu />
                <div className="resultSection">
                    <h2 className="resultSectionTitle">검색 결과</h2>     
                    { 
                        !loading
                        ? result ()
                        : <Loading />
                    }
                </div>
            </div>
        </div>
    )
}

const CaseSection =({ cases, state, keyword })=>{
    return(
        <>
        {
            !cases
            ? <h2 className="categoryTitle">해결사례 - 0 건</h2>
            : <div className="categorySection">
                <h2 className="categoryTitle">해결사례 - { cases.length } 건</h2>
                <ul>
                    {
                        cases.slice(0, 5).map((action, i)=>{
                            return(
                                <li key={ i }>     
                                    <p className="postLink">
                                        <Link to={`/cases/${action._id}`}>
                                            {action.title}
                                        </Link>
                                    </p>  
                                    <p>{action.createdAt.slice(0, 10)}</p>  
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="moreSection">
                    {
                        cases.length > 5
                        ? <Link to={`/cases/search?keyword=${ keyword }`} keyword={ state }>더보기</Link>
                        : null
                    }
                </div>
            </div>
        }
        </>
    )
}
const GuideSection =({ guide, state, keyword  })=>{
    return(
        <>
        {
            !guide
            ? <h2 className="categoryTitle">법률가이드 - 0 건</h2>
            : <div className="categorySection">
                <h2 className="categoryTitle">법률가이드 - { guide.length } 건</h2>
                <ul>
                    {
                        guide.slice(0, 5).map((action, i)=>{
                            return(
                                <li key={ i }>     
                                    <p className="postLink">
                                        <Link to={`/guide/${action._id}`}>
                                            {action.title}
                                        </Link>
                                    </p>  
                                    <p>{action.createdAt.slice(0, 10)}</p>  
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="moreSection">
                    {
                        guide.length > 5
                        ? <Link to={`/guide/search?keyword=${ keyword }`} keyword={ state }>더보기</Link>
                        : null
                    }
                </div>
            </div>
        }
        </>
    )
}
const VideoSection =({ video, state, keyword  })=>{
    return(
        <>
        {
            !video
            ? <h2 className="categoryTitle">법률동영상 - 0 건</h2>
            : <div className="categorySection">
                <h2 className="categoryTitle">법률동영상 - { video.length } 건</h2>
                <ul>
                    {
                        video.slice(0, 5).map((action, i)=>{
                            return(
                                <li key={ i }>     
                                    <p className="postLink">
                                        <Link to={`/video/${action._id}`}>
                                            {action.title}
                                        </Link>
                                    </p>  
                                    <p>{action.createdAt.slice(0, 10)}</p>  
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="moreSection">
                    {
                        video.length > 5
                        ? <Link  to={`/video/search?keyword=${ keyword }`} keyword={ state }>더보기</Link>
                        : null
                    }
                </div>
            </div>
        }
        </>
    )
}
export default Search;