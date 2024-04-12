import { useNavigate } from "react-router-dom"
import './SearchWrap.css'
import { useState } from "react";

const SearchWrap =({ state })=>{
    const navigate = useNavigate();
    const [ input, setInput ] = useState('');
    const handleInput = (e)=>{
        setInput(e.target.value)
    }
    const searchBtn = ()=>{
        navigate('/search', { state : input })
    }
    return(
        <div className="SearchWrap">
            <input type="text" placeholder="예) 민사/형사/손해배상" onChange={ handleInput } onKeyUp={ e =>{
                if(e.key === 'Enter') {
                    searchBtn()
                }
            }} defaultValue={ state }/>
            <button onClick={ searchBtn }>검색</button>
        </div>
    )
}
export default SearchWrap