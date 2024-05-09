//메인 페이지
//메인 페이지에 들어갈 HTML 짜는 곳
//홈화면 보기 npm start 
//import  CNNM  from './Home.js';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Main from './pages/Main'
import SearchPage from './pages/SearchPage';

// CSS
import './App.css';






function App() { 
  return <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="*" element={<p>잘못된 경로입니다</p>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
