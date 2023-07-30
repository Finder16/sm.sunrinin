import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import Home from './routes/home';
import Navigation from './components/Navigation';
import Login from './routes/login'
import Signup from './routes/signup'
import Profile from './routes/profile'

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
    </HashRouter>
  );
}

export default App;