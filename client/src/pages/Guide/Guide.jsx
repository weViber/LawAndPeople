import Banner from "../../components/Banner/Banner";
import Line from "../../components/Line/Line";
import Menu from "../../components/Menu/Menu";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import Board from "../Board/Board";

const Guide = ({isLogined})=>{
    return(
        <>
            <Banner banner='banner05'/>
            <div className="container">
                <SearchWrap />
                <Menu />
                <Line />
                <h2 className="BoardName">법률가이드</h2>
                <Board value="guide" isLogined={ isLogined }/>
            </div>
        </>
        
    )
}
export default Guide;