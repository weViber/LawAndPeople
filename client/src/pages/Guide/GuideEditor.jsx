import EditorComponent from "../../components/EditorComponent/EditorComponent"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { createGuide } from "../../service/guideService";

const GuideEditor = ()=>{
    const navigate = useNavigate()
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ category, setCategory ] = useState("손해배상")

    const handleTitle = (e)=>{
        setTitle(e.target.value)
    }
    const handleCategory = (e)=>{
        setCategory(e.target.value)
    }
    const sendBtn = ()=>{
        if(!title || !content ){
            return alert('정보를 입력해주세요')
        }
        createGuide({
            category : category,
            title : title,
            content : content 
        }).then(response => {
            if(response.data.message === "Success") {
                alert('작성 완료')
                navigate('/guide')
            }
        }).catch(err=>alert(`Error : ${ err.message }`))
    }
    const cancleBtn = ()=>{
        if (window.confirm("작성을 취소하시겠습니까?")) {
            navigate(-1)
          } else {
          }
    }
    
    return (
        <div className="CasesEditor">
            <div className="container">
                <h2>법률 가이드</h2>
                <label htmlFor="category">카테고리</label>
                <select onChange={ handleCategory } name="category">
                    <option value="기타 민사">기타 민사</option>
                    <option value="기타 형사">기타 형사</option>
                    <option value="산재">산재</option>
                    <option value="이혼">이혼</option>
                    <option value="행정">행정</option>
                    <option value="손해배상">손해배상</option>
                    <option value="교통사고">교통사고</option>
                    <option value="사기/공갈">사기/공갈</option>
                    <option value="금전/계약문제">금전/계약문제</option>
                    <option value="부동산/임대차">부동산/임대차</option>
                    <option value="명예훼손 모욕">명예훼손 모욕</option>
                    <option value="성폭력/강제추행">성폭력/강제추행</option>
                    <option value="의료/지식재산/금융">의료/지식재산/금융</option>
                    <option value="폭행/협박/상해일반">폭행/협박/상해일반</option>
                </select>
                <label htmlFor="title">제목</label>
                <input className="titleInput" type="text" placeholder="제목을 입력하세요" onChange={ handleTitle } name="title"/>
                <label htmlFor="">내용</label>
                <div className='EditorComponent'>
                    <EditorComponent  content={content} setContent={setContent}/>
                </div>
                <div className="BtnWrap">
                    <button className="Btn" onClick={ sendBtn }>작성하기</button>
                    <button className="Btn" onClick={ cancleBtn }>취소</button>
                </div>
            </div>
        </div>
    )
}
export default GuideEditor