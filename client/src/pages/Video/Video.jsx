import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Menu from "../../components/Menu/Menu";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import Loading from "../../components/Loading/Loading";
import './Video.css'
import { fetchVideo } from "../../service/videoService";
import Line from "../../components/Line/Line";

const Video = ({ isLogined })=>{

    const [ videos, setVideos ] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchPosts = async () => {
            const res = await fetchVideo()
            setVideos(res.data);
        }
        fetchPosts();
    }, [])

    return(
        <>
            <Banner banner='banner06'/>
            <div className="container">
                <SearchWrap />
                <Menu />
                <Line />
                <h2 className="BoardName">법률동영상</h2>
                {
                    !videos
                    ? <Loading />
                    : <ul className="VideoLists">
                    {
                        videos.map((a, i)=>{
                            return(
                                <li className="VideoList" key={ i }>
                                    <div className="VideoListBG">
                                        <Link to={`/video/${a._id}`}>
                                            <img src={`https://i.ytimg.com/vi/${ a.url }/hq720.jpg`} alt="" />
                                        </Link>
                                    </div>     
                                </li>
                            )
                        })
                    }
                    </ul>
                }
                {
                    isLogined===true
                    ? <button className="AdminWriteBtn" onClick={()=>{
                        navigate('/video/write')
                    }}>동영상 등록</button>
                    : null
                }
            </div>
        </>
    )
}
export default Video;