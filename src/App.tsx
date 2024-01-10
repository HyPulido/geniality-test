import React from 'react';
import logo from './logo.svg';
// import './App.css';

import './scss/style.scss'

// import "@coreui/coreui-pro/dist/js/coreui.bundle.min.js";
// import "@coreui/coreui-pro/dist/css/coreui.min.css";

import 'bootstrap/dist/css/bootstrap.min.css';


import { Home } from './views/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './views/login/Login';
import { Quiz } from './views/quiz/Quiz';
import { Question } from './views/question/Question';
import { QuizHistory } from './views/quiz/QuizHistory';
import { Answer } from './views/answer/Answer';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/quiz/:id/questions' element={<Question />} />
          <Route path='/quiz/:id/answers' element={<Answer />} />
          <Route path='/quices' element={<QuizHistory />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
