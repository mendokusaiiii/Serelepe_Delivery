import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';
import RegisterPage from './pages/register/register';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ HomePage } />
      <Route exact path="/login" component={ LoginPage } />
      <Route exact path="/register" component={ RegisterPage } />
    </Switch>
  );
}

export default App;
