import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './header';
import Poker from './Poker';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/about" component={null} />
          <Route path="/contact" component={null} />
          <Route path="/" component={null} />
        </Routes>
      </div>
      <div>
        <Poker />
      </div>
    </Router>
  );
}