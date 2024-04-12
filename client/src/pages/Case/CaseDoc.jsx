import Banner from "../../components/Banner/Banner"
import PostDoc from "../../components/PostDoc/PostDoc"
import Menu from "../../components/Menu/Menu";
import SearchWrap from "../../components/SearchWrap/SearchWrap";
import Profile from "../../components/Profile/Profile";

const CaseDoc = ({ isLogined })=>{
    return (
        <>
            <Banner banner='banner04'/>
            <div className="container">
                <SearchWrap />
                <Menu />
                <PostDoc value="cases" isLogined={ isLogined }/>
                <Profile />
            </div>
        </>
    )
}
export default CaseDoc