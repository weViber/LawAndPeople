import { useEffect, useState } from "react";
import axios from 'axios'
import Paging from "../../components/Paging/Paging";
import Postlist from "../../components/Postlist/Postlist";
import { useNavigate } from "react-router-dom";

const Board = ({ isLogined, value })=>{

    const [ input, setInput ] = useState()
    const [ posts, setPosts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postPerPage ] = useState(10)
    const navigate = useNavigate();

    const handleInput = (e)=>{
        setInput(e.target.value)
    }
    const searchBtn = ()=>{
        navigate(`/${value}/search?keyword=${input}`)
    }

    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(`http://localhost:8080/api/${ value }`)
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
    }, [value])

    const indexOfLastPost = currentPage * postPerPage; //1*10 = 10번 포스트
    const indexOfFirstPost = indexOfLastPost - postPerPage; //10-10 = 0번 포스트
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //0~10번까지 포스트

    return(
        <div id="Board">
            <Postlist postNum = { posts.length } currentPage = { currentPage } postPerPage = { postPerPage } posts={currentPosts} value={ value }/>
            <Paging page={currentPage} count={posts.length} setPage={setCurrentPage}/>
            <div>
                <input type="text" onChange={ handleInput } />
                <button onClick={ searchBtn }>검색</button>
            </div>
            {
                isLogined === true
                ? <button onClick={ ()=>{
                    navigate(`/${ value }/write`)
                } }>글쓰기</button>
                : null
            }
        </div>
    )
}
export default Board;