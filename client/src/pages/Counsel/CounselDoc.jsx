import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "../../components/Banner/Banner";
import './CounselDoc.css'
import { deleteCounsel, readCounsel, verifyCounsel } from "../../service/counselService";

const CounselDoc = ({ isLogined })=>{
    const { postId } = useParams();
    const [ post, setPost ] = useState({})
    const [ auth, setAuth ] = useState(false)
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()
    const token = useSelector((state) => state.user.value.token)

    useEffect(()=>{
        const fetchPosts = async () => {
            const res = await readCounsel({ postId })
            setPost(res.data);
        }
        fetchPosts();
    },[])
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    const authBtn = async ()=>{
        if(!password){
            return alert('비밀번호를 입력하세요')
        }
        if(password.length !== 4){
            return alert('비밀번호는 4자리입니다.')
        }
        try {
            await verifyCounsel({ postId, password })
            setAuth(true)
        } catch (err) {
            if(err.response && err.response.status === 403){
                return alert('비밀번호가 일치하지 않습니다')
            }
            return alert('확인에 실패했습니다. 잠시 후 다시 시도해주세요.')
        }
    }
    const deletePost = ()=>{
        if (window.confirm("해당 게시물을 삭제하시겠습니까?")) {
            // 일반 사용자는 입력한 비밀번호, 관리자는 토큰으로 인증
            deleteCounsel({ postId, password, token })
            .then(response => {
                if(response.data.message === "deleted") {
                    alert('삭제 완료')
                    navigate('/counsel')
                }
            }).catch(err=>{
                if(err.response && err.response.status === 403){
                    return alert('비밀번호가 일치하지 않습니다')
                }
                alert(`Error : ${ err.message }`)
            })
        } else {
        }
    }

    return(
    <div>
        <Banner banner='banner02'/>
        <div className="container">
            {
                auth || isLogined
                ? <Contents post = { post } navigate = {navigate} postId={ postId } deletePost={ deletePost } credential={ auth ? { password } : { token } }/>
                : <InputPassWord handlePassword={ handlePassword } authBtn={ authBtn }/>
            }
        </div>
    </div>

    )
}
const InputPassWord = ({ handlePassword, authBtn })=>{
    return(
        <div className="InputPassWord">
            <label htmlFor="password">비밀번호를 입력하세요</label>
            <input type="password" onChange={ handlePassword } name='password' maxlength={ 4 } onKeyUp={ e =>{
                if(e.key === 'Enter') {
                    authBtn()
                }
            }}/>
            <button className="passwordBtn" onClick={ authBtn }>입력</button>
        </div>
    )  
}
const Contents = ({ post, navigate, postId, deletePost, credential })=>{
    return(
        <div className="CounselDoc">
            <div className="Section01">
                <p className="sectionTitle">상담 사례</p>
                <p className="categoryTitle">{post.category}</p>
            </div>
            <div className="Section02">         
                <h2>{post.title}</h2>
                <p className="editor">작성자 : {post.name}</p>
                <a className="editor" href={`tel:${post.phone}`}>전화번호 : {post.phone}</a>
                <div className="editDate">
                    <p className="createdAt">작성일 : {post.createdAt}</p>
                    {
                        !post.updatedAt
                        ? null
                        : <p className="createdAt">수정일 : {post.updatedAt}</p>
                    }
                </div>
            </div>
            <div className="SectionAdmin">
                <button onClick={()=>{
                     navigate(`/counsel/rewrite/${ postId }`, { state : credential })
                }}>수정</button>
                <button onClick={ deletePost } >삭제</button>
            </div>
            <div className="Section03">
                <div dangerouslySetInnerHTML={{ __html : post.content }}/>
            </div>
        </div>
    )
}
export default CounselDoc