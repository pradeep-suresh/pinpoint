import React from 'react'
import AddButtonView  from './feature/AddButton/AddButtonView';
import DropDownView from './feature/DropDown/DropDownView'
import UrlTableView from './feature/UrlTable/UrlTableView';
import FooterView from './feature/Footer/FooterView';

const App = () => {


  return (
    <div>
      <div>
        <h2>
          Url Shortener
        </h2>
        <DropDownView />
        <AddButtonView />
        <UrlTableView />
        <FooterView/>
      </div>
    </div>
  );
};

export default App;