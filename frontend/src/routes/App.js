import React from 'react';
import '../styles/App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Navigation from './Navigation';
import Login from './login'
import Signup from './signup'
import Profile from './profile'
import Video from './video';

function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="/" exact={true} element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/video" element={<Video/>} />
      </Routes>
      <Navigation />
    </HashRouter>
  );
}

export default App;
