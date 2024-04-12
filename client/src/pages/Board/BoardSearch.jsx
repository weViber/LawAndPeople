import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Postlist from "../../components/Postlist/Postlist";
import Paging from "../../components/Paging/Paging";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux';

const BoardSearch = ({ value })=>{
    const isLogined = useSelector((state) => state.user.value.isLogined)

    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ input, setInput ] = useState()
    const [ posts, setPosts ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postPerPage ] = useState(10)
    const navigate = useNavigate();

    const keyword = searchParams.get('keyword');

    useEffect(()=>{
        const fetchPosts = async () => {
            const res = await axios.post(`http://localhost:8080/api/${ value }/search`, { keyword })
            setPosts(res.data);
        }
        fetchPosts();
    }, [ keyword ])

    const handleInput = (e)=>{
        setInput(e.target.value)
    }
    const searchBtn = ()=>{
        navigate(`/${value}/search?keyword=${input}`)
    }

    const indexOfLastPost = currentPage * postPerPage; //1*10 = 10번 포스트
    const indexOfFirstPost = indexOfLastPost - postPerPage; //10-10 = 0번 포스트
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //0~10번까지 포스트

    return (
        <>
            <h3>{ keyword }에 대한 검색 결과입니다.</h3>
            <Postlist posts={currentPosts} value={ value }/>
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
        </>
    )
}

export default BoardSearch;