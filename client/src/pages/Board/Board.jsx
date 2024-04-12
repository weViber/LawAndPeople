import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchBoard } from "../../service/boardService";
import Paging from "../../components/Paging/Paging";
import Postlist from "../../components/Postlist/Postlist";
import Loading from "../../components/Loading/Loading";
import './Board.css'

const Board = ({ isLogined, value })=>{
    const [ searchParams, setSearchParams ] = useSearchParams();

    const navigate = useNavigate();
    const [ input, setInput ] = useState()
    const [ data, setData ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postPerPage ] = useState(10)
    const keyword = searchParams.get('keyword');

    const handleInput = (e)=>{
        setInput(e.target.value)
    }
    const searchBtn = ()=>{
        navigate(`/${value}/search?keyword=${input}`)
    }

    useEffect(()=>{
        if(!keyword){
            const LoadData = async () => {
                await fetchBoard({ value })
                    .then(response=>{
                        setData(response.data)
                    })
                    .catch(err=>console.log(err.message.message))
            }
            LoadData();
        } else {
            const LoadData = async () => {
                await fetchBoard({ value })
                    .then(response=>{
                        const originData = response.data
                        const result = originData.filter(data=>{
                            return data.category.includes(keyword) || data.title.includes(keyword)
                        })
                        setData(result)
                    })
                    .catch(err=>console.log(err.message.message))
            }
            LoadData();
        }
    }, [value, keyword])

    const indexOfLastPost = currentPage * postPerPage; //1*10 = 10번 포스트
    const indexOfFirstPost = indexOfLastPost - postPerPage; //10-10 = 0번 포스트
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost) //0~10번까지 포스트

    return(
        <div id="Board">
            {
                !data
                ? <Loading />
                : <div className="BoardList">
                    <Postlist postNum = { data.length } currentPage = { currentPage } postPerPage = { postPerPage } posts={ currentPosts } value={ value }/>
                    <div className="AdminWrap">
                        {
                            isLogined === true
                            ? <button className="AdminWriteBtn" onClick={ ()=>{
                                navigate(`/${ value }/write`)
                            } }>글쓰기</button>
                            : null
                        }
                    </div>
                    <Paging page={currentPage} count={data.length} setPage={setCurrentPage}/>
                    <div className="boardSearchWrap">
                        <input className="boardSearchInput" type="text" onChange={ handleInput } />
                        <button className="boardSearchBtn" onClick={ searchBtn }>검색</button>
                    </div>
                </div>

            }
           
        </div>
    )
}
export default Board;