import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Search from './pages/Search/Search';
import BoardSearch from './pages/Board/BoardSearch';
import CasesEditor from './pages/Case/CasesEditor';
import GuideEditor from './pages/Guide/GuideEditor';
import VideoEditor from './pages/Video/VideoEditor';
import CaseRewrite from './pages/Case/CaseRewrite';

import { useSelector } from 'react-redux'
import Login from './pages/Login/Login';
import Logout from './pages/Login/Logout';
import GuideRewrite from './pages/Guide/GuideRewrite';
import VideoRewrite from './pages/Video/VideoRewrite';
import Counsel from './pages/Counsel/Counsel';
import CounselEditor from './pages/Counsel/CounselEditor';
import CounselDoc from './pages/Counsel/CounselDoc';
import CounselRewrite from './pages/Counsel/CounselRewrite';
import VideoDoc from './pages/Video/VideoDoc';
import CaseDoc from './pages/Case/CaseDoc';
import GuideDoc from './pages/Guide/GuideDoc';
import Case from './pages/Case/Case';
import Guide from './pages/Guide/Guide';
import Video from './pages/Video/Video';
import About from './pages/About/About';
import SideBar from './components/SideBar/SideBar';
import { useState } from 'react';
import MobileMenu from './components/MobileMenu/MobileMenu';

function App() {
  const isLogined = useSelector((state) => state.user.value.isLogined)
  const [ sideBar, setSideBar ] = useState(false)

  return (
    <div className="App">
      {
        isLogined === true
        ? <Logout />
        : null
      }
      <SideBar sideBar={ sideBar } setSideBar={ setSideBar }/>
      <Header sideBar={ sideBar } setSideBar={ setSideBar }/>
      <Routes>
        <Route path='/' element={ <Main />} />

        <Route path='/admin' element={ <Login/>} />

        <Route path='/about' element={ <About />} />

        <Route path='/cases' element={ <Case isLogined={ isLogined }/>} />
        <Route path='/guide' element={ <Guide isLogined={ isLogined }/>} />
        <Route path='/counsel' element={ <Counsel />} />
        <Route path='/video' element={ <Video isLogined={ isLogined }/>} />
        
        <Route path='/cases/search' element={ <Case value="cases"/>} />
        <Route path='/counsel/search' element={ <BoardSearch value="counsel"/>} />
        <Route path='/guide/search' element={ <Guide value="guide"/>} />

        <Route path='/cases/:postId' element={ <CaseDoc isLogined={ isLogined }/>} />
        <Route path='/guide/:postId' element={ <GuideDoc isLogined={ isLogined }/>} />
        <Route path='/counsel/:postId' element={ <CounselDoc isLogined={ isLogined }/>} />
        <Route path='/video/:videoId' element={ <VideoDoc isLogined={ isLogined }/>} />

        <Route path='/cases/write' element={ <CasesEditor isLogined={ isLogined }/>} />
        <Route path='/guide/write' element={ <GuideEditor isLogined={ isLogined }/>} />
        <Route path='/counsel/write' element={ <CounselEditor />} />
        <Route path='/video/write' element={ <VideoEditor isLogined={ isLogined }/>} />

        <Route path='/cases/rewrite/:postId' element={ <CaseRewrite />} />
        <Route path='/counsel/rewrite/:postId' element={ <CounselRewrite />} />
        <Route path='/guide/rewrite/:postId' element={ <GuideRewrite />} />
        <Route path='/video/rewrite/:videoId' element={ <VideoRewrite />} />

        <Route path='/search' element={ <Search />} />
      </Routes>
      <MobileMenu />
      <Footer />
    </div>
  );
}

export default App;
