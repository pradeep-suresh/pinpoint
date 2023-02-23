import React from 'react'

import ToolBarView from './feature/ToolBar/ToolBarView';
import UrlTableView from './feature/UrlTable/UrlTableView';
import FooterView from './feature/Footer/FooterView';

import './App.css'

const App = () => {

  return (
    <div className='container'>
        <h2>
          Url Shortener
        </h2>
        <ToolBarView />
        <UrlTableView />
        <FooterView/>
    </div>
  );
};

export default App;