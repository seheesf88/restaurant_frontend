import './App.css';
import React, { Component }  from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import MainContainer from './MainContainer';

const My404 = () => {
  return (
   <div>
    error!
   </div>
  )
}



const App = (props) => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component = { MainContainer } />
      </Switch>
    </main>
  );
}

export default App;
