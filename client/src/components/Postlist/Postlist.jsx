import { Link } from 'react-router-dom';
import './Postlist.css'
import Loading from '../Loading/Loading';

const Postlist = ({ posts, value })=>{
    return (
        <div className='Postlist'>
            <div className='BoardHead'>
                <div className='BoardHead01'>분류</div>
                <div className='BoardHead02'>제목</div>
                <div className='BoardHead03'>등록일</div>
            </div>
            <div className='BoardBody'>
                {
                !posts
                ? <Loading />
                : <>                
                    {
                        posts.map((a, i)=>{
                            return(
                                <div className='BoardList' key={i}>     
                                    <div className='BoardHead01'>{posts[i].category}</div>  
                                    <div className='BoardHead02'>
                                        <Link className='BoardLink' to={`/${value}/${posts[i]._id}`}>
                                            {posts[i].title}
                                        </Link>
                                    </div>  
                                    <div className='BoardHead03'>{posts[i].createdAt.slice(0, 10)}</div>  
                                </div>
                            )
                        })
                    }
                </>
                } 
            </div>
        </div>
    )
}
export default Postlist;