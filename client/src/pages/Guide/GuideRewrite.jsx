import EditorComponent from "../../components/EditorComponent/EditorComponent"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getGuide, updateGuide } from "../../service/guideService";

const GuideRewrite = ()=>{
    const navigate = useNavigate()
    const { postId } = useParams();
    const { state } = useLocation()
    const [ category, setCategory ] = useState("")
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ post, setPost ] = useState({})

    const handleTitle = (e)=>{
        setTitle(e.target.value)
    }

    const handleCategory = (e)=>{
        setCategory(e.target.value)
    }

    useEffect(()=>{
        const fetchPost = async () => {
            const res = await getGuide({postId})
            setPost(res.data)
            setTitle(res.data.title)
            setContent(res.data.content)
            setCategory(res.data.category)
        }
        fetchPost();
    }, [])

    const sendBtn = ()=>{
        if(!title || !content ){
            return alert('정보를 입력해주세요')
        }
        updateGuide({
            postId: postId,
            category : category,
            title : title,
            content : content
        }).then(response => {
            if(response.data.message === "updated") {
                alert('수정 완료')
                navigate(-1)
            }
        }).catch(err=>alert(`Error : ${ err.message }`))
    }
    const cancleBtn = ()=>{
        if (window.confirm("작성을 취소하시겠습니까?")) {
            navigate('/')
          } else {
          }
    }
    
    return (
        <div className="CasesEditor">
            <div className="container">
                <h2>법률 가이드</h2>
                <label htmlFor="category">카테고리</label>
                <select onChange={ handleCategory } name="category" defaultValue={ category }>
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
                <label htmlFor="title">제목</label>
                <input className="titleInput" type="text" placeholder="제목을 입력하세요" onChange={ handleTitle } name="title"  defaultValue={ title }/>
                <label htmlFor="">내용</label>
                <div className='EditorComponent'>
                    <EditorComponent  content={content} setContent={setContent}  defaultValue={ content }/>
                </div>
                <div className="BtnWrap">
                    <button className="Btn" onClick={ sendBtn }>작성하기</button>
                    <button className="Btn" onClick={ cancleBtn }>취소</button>
                </div>
            </div>
        </div>
    )
}
export default GuideRewrite