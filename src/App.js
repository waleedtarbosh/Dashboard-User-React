import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Overview from './components/Overview/Overview';
import Tickets from './components/Tickets/Tickets';
import Ideos from './components/Ideos/Ideos';
import WrapperUsers from './components/WrapperUsers/WrapperUsers';
import RandomUsers from './components/RandomUsers/RandomUsers';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
const MainContainer = (props) => {
  return <div className="main-container">{props.children}</div>;
};

const ContentContainer = (props) => {
  return <div className="content-container">{props.children}</div>;
};



const App = () => {
  return (
    <Router>
      <MainContainer>
        <Sidebar />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Overview/>} />
            <Route path="overview" element={<Overview/>} />
            <Route path="tickets" element={<Tickets/>} />
            <Route path="ideos" element={<Ideos/>} />
            <Route path="users" element={<WrapperUsers/>} />
            <Route path="users/:id" element={<RandomUsers/>} />
            <Route path='*' element={<NotFoundPage/>}></Route>
          </Routes>
        </ContentContainer>
      </MainContainer>
    </Router>
  );
};

export default App;
