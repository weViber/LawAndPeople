import EditorComponent from "../../components/EditorComponent/EditorComponent"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './CounselEditor.css'
import { readCounsel, updateCounsel } from "../../service/counselService";

const CounselRewrite = ()=>{
    const { postId } = useParams();
    const { state } = useLocation();

    const navigate = useNavigate()
    const [ input, setInput ] = useState({
        category : "손해배상",
        title : '',
        name : '',
        phone : '',
        password : ''
    })

    const { category, title, name, phone, password } = input
    const [content, setContent] = useState("")

    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }
    useEffect(()=>{
        if(!state){
            return alert('해당 게시물의 수정 권한이 없습니다.')
        } else{
            const fetchPost = async () => {
                
                const res = await readCounsel({ postId })
                setInput({
                    ...input,
                    category : res.data.category,
                    title : res.data.title,
                    name : res.data.name,
                    phone : res.data.phone,
                    password : res.data.password
                })
                setContent(res.data.content)
    
            }
            fetchPost();
        }
    }, [])

    const sendBtn = ()=>{
        updateCounsel({
            postId : postId,
            category : category,
            title : title,
            name : name,
            phone : phone,
            password : password,
            content : content,
        }).then(response => {
            if(response.data.message === "updated") {
                alert('수정 완료')
                navigate('/counsel')
            }
        }).catch(err=>alert(`Error : ${ err.message }`))
    }

    const cancleBtn = ()=>{
        if (window.confirm("수정을 취소하시겠습니까?")) {
            navigate(-1)
          } else {
          }
    }
    
    return (
        <div className="CounselEditor">
            <div className="container">
                <h2>신청 정보</h2>
                <label htmlFor="title">제목</label>
                <input className="titleInput" defaultValue={ title } type="text" placeholder="제목을 입력하세요" onChange={ handleInput } name="title"/>
                <label htmlFor="title">성명</label>
                <input className="titleInput" defaultValue={ name } type="text" placeholder="성명" onChange={ handleInput } name="name"/>
                <label htmlFor="title">연락처</label>
                <input className="titleInput" defaultValue={ phone } type="text" placeholder="연락처" onChange={ handleInput } name="phone"/>
                <label htmlFor="title">비밀번호</label>
                <input className="titleInput" defaultValue={ password } type="text" placeholder="비밀번호" onChange={ handleInput } name="password"/>
                <label htmlFor="title">상담분류</label>
                <select onChange={ handleInput } name="category" defaultValue={ category }>
                    <option value="손해배상">손해배상</option>
                    <option value="사기/공갈">사기/공갈</option>
                    <option value="산재">산재</option>
                    <option value="성폭력/강제추행">성폭력/강제추행</option>
                    <option value="부동산/임대차">부동산/임대차</option>
                    <option value="이혼">이혼</option>
                    <option value="금전/계약문제">금전/계약문제</option>
                    <option value="기타 민사">기타 민사</option>
                    <option value="명예훼손 모욕">명예훼손 모욕</option>
                    <option value="의료/지식재산/금융">의료/지식재산/금융</option>
                    <option value="폭행/협박/상해일반">폭행/협박/상해일반</option>
                    <option value="행정">행정</option>
                </select>
                <div className='EditorComponent'>
                    <EditorComponent content={content} setContent={setContent} defaultValue={ content }/>
                </div>
                <div className="BtnWrap">
                <button className="Btn" onClick={ sendBtn }>수정</button>
                    <button className="Btn" onClick={ cancleBtn }>취소</button>
                </div>
            </div>
        </div>
    )
}
export default CounselRewrite