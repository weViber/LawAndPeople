import { useNavigate } from "react-router-dom"
import './SearchMenu.css'

const SearchMenu =()=>{
    const navigate = useNavigate();
    const handleMenu = (e)=>{
        navigate(`/${e.target.value}`)
    }
    return(
        <div className="Menu">
            <button onClick={ handleMenu } value='cases'>해결사례</button>
            <button onClick={ handleMenu } value='guide'>법률가이드</button>
            <button onClick={ handleMenu } value='video'>법률동영상</button>
        </div>
    )
}
export default SearchMenu