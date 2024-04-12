import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { getVideo, updateVideo } from "../../service/videoService";

const VideoRewrite = ()=>{
    const navigate = useNavigate()
    const { videoId } = useParams();
    const [ title, setTitle ] = useState("")
    const [ url, setUrl ] = useState("")
    const [ keyword, setKeyword ] = useState("")

    useEffect(()=>{
        const fetchVideo = async () => {
            const res = await getVideo({ videoId })
            setTitle(res.data.title)
            setUrl(`https://www.youtube.com/watch?v=${ res.data.url }`)
            setKeyword(res.data.keyword)
        }
        fetchVideo();
    }, [videoId])

    const handleTitle = (e)=>{
        setTitle(e.target.value)
    }
    const handleURL = (e)=>{
        setUrl(e.target.value)
    }
    const handleKeyword = (e)=>{
        setKeyword(e.target.value)
    }
    const sendBtn = ()=>{
        updateVideo({ 
            videoId : videoId,
            title : title,
            url : url.replace('https://www.youtube.com/watch?v=', ''),
            keyword : keyword
        }).then(response => {
            if(response.data.message === "updated") {
                alert('수정 완료')
                navigate('/video')
            }
        }).catch(err=>alert(`Error : ${ err.message }`))
    }

    const cancleBtn = ()=>{
        if (window.confirm("작성을 취소하시겠습니까?")) {
            navigate('/video')
          } else {
          }
    }


    return (
        <div className="CasesEditor">
            <div className="container">
                <h2>동영상 등록</h2>
                <label htmlFor="title">제목</label>
                <input className="titleInput" type="text" placeholder="제목을 입력하세요" name="title" onChange={ handleTitle } defaultValue={ title }/>
                <label htmlFor="url">동영상 URL 주소</label>
                <input className="titleInput" type="text" placeholder="Youtube URL을 입력하세요" name="url" onChange={ handleURL } defaultValue={ url }/>
                <label htmlFor="keyword">키워드</label>
                <input className="titleInput" type="text" placeholder="키워드를 입력하세요" name="keyword" onChange={ handleKeyword } defaultValue={ keyword }/>
                <div className="BtnWrap">
                    <button className="Btn" onClick={ sendBtn }>작성하기</button>
                    <button className="Btn" onClick={ cancleBtn }>취소</button>
                </div>
            </div>
        </div>
    )
}
export default VideoRewrite