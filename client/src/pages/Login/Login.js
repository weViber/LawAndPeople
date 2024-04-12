import { useDispatch } from 'react-redux'
import { login } from '../../redux/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../service/userService';
import './Login.css'

const Login = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ input, setInput ] = useState({
        id : '',
        password : ''
    })
    const { id, password } = input
    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }

    const LoginBtn = ()=>{
        signin({ id, password })
        .then(result=>{
            if(result.data.message === 'InvaildID'){
                return alert('아이디 오류')
            } else if(result.data.message === 'InvaildPassword'){
                return alert('비밀번호 오류')
            } else {
                dispatch(login({ isLogined : true }))
                navigate('/')
            }
        }).catch(err => alert(err.message.message))
    }
    return(
        <div className='Login'>
            <div className='container'>
                <h2>관리자 페이지</h2>
                <label htmlFor='id'>아이디</label>
                <input type="text" onChange={ handleInput } name='id' />
                <label htmlFor='password'>비밀번호</label>
                <input type="password" onChange={ handleInput } name='password' />
                <button onClick={ LoginBtn }>로그인</button>
            </div>
        </div>
    )
}
export default Login