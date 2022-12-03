import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import Home from './components/Home';

const App = () => {

  return (
      <BrowserRouter>
        <div>
          <Link to="/home"> Home </Link>
          <Link to="/"> Contact </Link>
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Contact />} />
          <Route path="*" element={<h1> page not found</h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
