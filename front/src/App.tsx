import React from 'react';
import './App.sass';
import MainPage from './components/MainPage';
import ReportPage from './components/ReportPage';
import {Routes, Route} from 'react-router-dom';

interface IApp {}

const App: React.FC<IApp> = () => {
  return (
    <div className="containerApp">
      <div className="wrapperApp">
        <Routes>
          <Route path="/"  element={<MainPage/>}/>
          <Route path="/report"  element={<ReportPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
