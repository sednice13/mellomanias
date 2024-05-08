import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'; 
import Terms from './components/policy/Terms';
import Private from './components/policy/Private';
import Home from './components/sites/Home';
import Register from './components/account/Register';
import Login from './components/account/Login';
import { AuthProvider } from './components/account/Authcontext';
import Chooseforum from './components/sites/Forum/Chooseforum';
import Topics from './components/sites/Forum/Topics';
import Forum from './components/sites/Forum/Forum';

class App extends Component {
  render() {
    return (
        <AuthProvider>  
      <div className="app-container">
        <Header />
        <div className="content-wrapper">
          <Container fluid style={{ paddingTop: '0px', paddingBottom: '0px', height: '100%', width: '100%', paddingRight: "0px", paddingLeft: "0px"  }}>
            <Router >
            <Routes>
            <Route path='/create-account' exact element={<Register />} /> 
            <Route path='/' exact element={<Home />} />   
            <Route path='/terms' exact element={<Terms />} />
            <Route path='/private' exact element={<Private />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/forum' exact element={<Chooseforum />}/> 
            <Route path='/topics/:topic'  exact element={<Topics />} />
            <Route path='/topics/:topic/:theme'  exact element={<Forum/>} />
            </Routes>
        </Router>
          </Container>
        </div>
        <Footer />
      </div>
      </AuthProvider>
    );
  }
}
export default App;