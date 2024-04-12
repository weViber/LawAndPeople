import { useEffect, useState } from "react";
import Paging from "../../components/Paging/Paging";
import { useNavigate } from "react-router-dom";
import CounselList from "../../components/CounselList/CounselList";
import Banner from "../../components/Banner/Banner";
import { fetchCounsel } from "../../service/counselService";
import './Counsel.css'

const Counsel = ()=>{

    const [ input, setInput ] = useState()
    const [ posts, setPosts ] = useState([])

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postPerPage ] = useState(10)

    const navigate = useNavigate();

    const handleInput = (e)=>{
        setInput(e.target.value)
    }
    const searchBtn = ()=>{
        navigate(`/counsel/search?keyword=${input}`)
    }

    useEffect(()=>{
        const fetchPosts = async () => {
            const res = await fetchCounsel()
            setPosts(res.data);
        }
        fetchPosts();
    }, [])

    const indexOfLastPost = currentPage * postPerPage; //1*10 = 10번 포스트
    const indexOfFirstPost = indexOfLastPost - postPerPage; //10-10 = 0번 포스트
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //0~10번까지 포스트

    return(
        <div id="Board">
            <Banner banner='banner02'/>
            <div className="container">
                <CounselList postNum = { posts.length } currentPage = { currentPage } postPerPage = { postPerPage } posts={currentPosts}/>
                <Paging page={currentPage} count={posts.length} setPage={setCurrentPage}/>
                <div className="writeBtnWrap">
                    <button className="AdminWriteBtn" onClick={()=>{
                        navigate('/counsel/write')
                    }}>상담신청 하기</button>
                </div>
                <div className="boardSearchWrap">
                    <input className="boardSearchInput" type="text" onChange={ handleInput } />
                    <button className="boardSearchBtn" onClick={ searchBtn }>검색</button>
                </div>

            </div>
        </div>
    )
}
export default Counsel;