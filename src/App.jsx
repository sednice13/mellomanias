import React, { Component } from 'react';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Importera App.css
import Terms from './components/policy/Terms';
import Private from './components/policy/Private';
import Home from './components/sites/Home';
import Register from './components/account/Register';
import Login from './components/account/Login';
import { AuthProvider } from './components/account/Authcontext';
import Chooseforum from './components/sites/Forum/Chooseforum';
import Topics from './components/sites/Forum/Topics';
import Forum from './components/sites/Forum/Forum';
import Comments from './components/sites/Forum/Comments';
import { StatusProvider } from './components/status/StatusContext';
import StatusComponent from './components/status/StatusComponent';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <StatusProvider>
          <Router>
            <div className="app-container">
              <Header />
              <StatusComponent />
              <div className="content-wrapper">
                <Routes>
                  <Route path='/create-account' exact element={<Register />} />
                  <Route path='/' exact element={<Home />} />
                  <Route path='/terms' exact element={<Terms />} />
                  <Route path='/private' exact element={<Private />} />
                  <Route path='/login' exact element={<Login />} />
                  <Route path='/forum' exact element={<Chooseforum />} />
                  <Route path='/topics/:topic' exact element={<Topics />} />
                  <Route path='/topics/:topic/:theme' exact element={<Forum />} />
                  <Route path='/topics/:topic/:theme/:postid' exact element={<Comments />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </StatusProvider>
      </AuthProvider>
    );
  }
}

export default App;
