import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard, readBoard } from "../../service/boardService";
import './PostDoc.css'
import "react-quill/dist/quill.snow.css"
import styles from './PostContent.module.css'

const PostDoc = ({ value, isLogined })=>{

    const { postId } = useParams();
    const [ post, setPost ] = useState({})
    const navigate = useNavigate()
    const sectionTitle = ()=>{
        if(value === 'cases'){
            return '해결사례'
        }
        if(value === 'guide'){
            return '법률가이드'
        }
        if(value === 'video'){
            return '법률동영상'
        }
    }
    useEffect(()=>{
        const fetchPosts = async () => {
            const res = await readBoard({ value, postId })
            setPost(res.data);
        }
        fetchPosts();
    },[value, postId])

    const deletePost = ()=>{
        if (window.confirm("해당 게시물을 삭제하시겠습니까?")) {
            deleteBoard({value, postId})
            .then(response => {
                if(response.data.message === "Success") {
                    alert('삭제 완료')
                    navigate(`/${ value }`)
                }
            }).catch(err=>alert(`Error : ${ err.message }`))
        } else {
        }
    }
    return(
        <div className="PostDoc">
            <div className="Section01">
                <p className="sectionTitle">{ sectionTitle() }</p>
                <p className="categoryTitle">{post.category}</p>
            </div>
            <div className="Section02">         
                <h2>{post.title}</h2>
                <p className="editor">작성자 : 법과사람들</p>
                <div className="editDate">
                    <p className="createdAt">작성일 : {post.createdAt}</p>
                    {
                        !post.updatedAt
                        ? null
                        : <p className="createdAt">수정일 : {post.updatedAt}</p>
                    }
                    <p className="createdAt">조회수 : {post.views}</p>
                </div>
            </div>
            {
                isLogined === true
                ? <div className="SectionAdmin">
                    <button onClick={()=>{
                        navigate(`/${ value }/rewrite/${ postId }`)
                    }}>수정</button>
                    <button onClick={ deletePost } >삭제</button>
                </div>
                : null
            }
            <div className="Section03">
                <div className={ styles.PostDocContents } dangerouslySetInnerHTML={{ __html : post.content }}/>
            </div>
        </div>
    )
}
export default PostDoc