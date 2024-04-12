import Banner from "../../components/Banner/Banner"
import PostDoc from "../../components/PostDoc/PostDoc"
import Menu from "../../components/Menu/Menu";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import Profile from "../../components/Profile/Profile";
import Line from "../../components/Line/Line";

const GuideDoc = ({ isLogined })=>{
    return (
        <>
            <Banner banner='banner04'/>
            <div className="container">
                <SearchWrap />
                <Menu />
                <PostDoc value="guide" isLogined={ isLogined }/>
                <Line />
                <Profile />
            </div>
        </>
        
    )
}
export default GuideDoc