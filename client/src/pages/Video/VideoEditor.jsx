import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { createVideo } from "../../service/videoService";

const VideoEditor = ()=>{
    const navigate = useNavigate()
    const [ title, setTitle ] = useState("")
    const [ url, setUrl ] = useState("")
    const [ keyword, setKeyword ] = useState("")

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
        if(!title || !url ){
            return alert('정보를 입력해주세요')
        }
        createVideo({
            title : title,
            url : url.replace('https://www.youtube.com/watch?v=', ''),
            keyword : keyword
        }).then(response => {
            if(response.data.message === "Success") {
                alert('작성 완료')
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
                <input className="titleInput" type="text" placeholder="제목을 입력하세요" name="title" onChange={ handleTitle }/>
                <label htmlFor="url">동영상 URL 주소</label>
                <input className="titleInput" type="text" placeholder="Youtube URL을 입력하세요" name="url" onChange={ handleURL }/>
                <label htmlFor="keyword">키워드</label>
                <input className="titleInput" type="text" placeholder="키워드를 입력하세요" name="keyword" onChange={ handleKeyword }/>
                <div className="BtnWrap">
                    <button className="Btn" onClick={ sendBtn }>작성하기</button>
                    <button className="Btn" onClick={ cancleBtn }>취소</button>
                </div>
            </div>
        </div>
    )
}
export default VideoEditor