import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Banner from "../../components/Banner/Banner"
import Menu from "../../components/Menu/Menu";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import './VideoDoc.css'
import Profile from "../../components/Profile/Profile";
import { deleteVideo, getVideo } from "../../service/videoService";

const VideoDoc = ({ isLogined })=>{
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [ video, setVideo ] = useState({
        url: ""
    });
    const deleteBtn = ()=>{
        if (window.confirm("해당 동영상을 삭제하시겠습니까?")) {
            deleteVideo({ videoId })
            .then(response => {
                if(response.data.message === "Success") {
                    alert('삭제 완료')
                    navigate('/video')
                }
            }).catch(err=>alert(`Error : ${ err.message }`))
        } else {
        }
    }
    useEffect(()=>{
        const fetchPosts = async () => {
            const res = await getVideo({ videoId })
            setVideo(res.data);
        }
        fetchPosts();
    },[videoId])
    
    useEffect(()=>{
        window.scrollTo({ top: 0 });
    }, [])
    return(
        <>
            <Banner banner='banner04'/>
            <div className="container">
                <SearchWrap />
                <Menu />
                <div id="Video" className="VideoDoc">
                    <div className="Section01">
                        <p className="sectionTitle">법률동영상</p>
                        <h2 className="videoTitle">{video.title}</h2>
                        <p className="createdAt">작성일 : {video.createdAt}</p>
                        {
                            video.updateAt
                            ? <p className="createdAt">수정일 : {video.updateAt}</p>
                            : null
                        }
                    </div>
                    {
                        isLogined === true
                        ? <div className="SectionAdmin">
                            <button onClick={()=>{
                                navigate(`/video/rewrite/${ videoId }`)
                            }}>수정하기</button>
                            <button onClick={ deleteBtn } >삭제</button>
                        </div>
                        : null
                    }
                    <div className="videoWrap">
                        <div className="video">
                            <iframe src={ `https://www.youtube.com/embed/${ video.url }` } title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>
                        </div>
                    </div>
                    {/* <Line /> */}
                    <Profile />
                </div>
            </div>
        </>
  
    )
}
export default VideoDoc;