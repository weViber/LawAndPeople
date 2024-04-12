import Banner from "../../components/Banner/Banner";
import Line from "../../components/Line/Line";
import Menu from "../../components/Menu/Menu";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import Board from "../Board/Board";


const Case = ({ isLogined })=>{
    return(
        <>
            <Banner banner='banner04'/>
            <div className="container">
                <SearchWrap />
                <Menu />
                <Line />
                <h2 className="BoardName">해결사례</h2>
                <Board value="cases" isLogined={ isLogined }/>

            </div>
        </>
    )
}
export default Case;