import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './CounselList.css'
import { useEffect, useState } from 'react';
import NewIcon from '../NewIcon/NewIcon';

const CounselList = ({ posts })=>{
    const [ today, setToday ] = useState('');
    useEffect(()=>{
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth()+1;
        const day = today.getDate();
        const date = year+"-"+(("00"+month.toString()).slice(-2))+"-"+(("00"+day.toString()).slice(-2));
        setToday(date)
    }, [])
    return (
        <div className='CounselList'>
            <div className='BoardHead'>
                <div className='BoardHead01'>분류</div>
                <div className='BoardHead02'>제목</div>
                <div className='BoardHead03'>작성자</div>
                <div className='BoardHead04'>등록일</div>
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
                                    <div className='BoardHead01'>{a.category}</div>  
                                    <div className='BoardHead02'>
                                        <Link className='BoardLink' to={`/counsel/${posts[i]._id}`}>
                                            {a.title}
                                        </Link>
                                        {
                                            today === a.createdAt.slice(0, 10)
                                            ? <NewIcon />
                                            : null
                                        }
                                    </div>  
                                    <div className='BoardHead03'>{a.name.charAt(0)}*{a.name.charAt(a.name.length - 1)}
                                    </div>  
                                    <div className='BoardHead04'>{a.createdAt.slice(0, 10)}</div>  
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
export default CounselList;