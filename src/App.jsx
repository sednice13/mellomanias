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

class App extends Component {
  render() {
    return (
        
      <div className="app-container">
        <Header />
        <div className="content-wrapper">
          <Container style={{ paddingTop: '60px', paddingBottom: '60px', height: '100%' }}>
            <Router>
            <Routes>
            <Route path='/create-account' exact element={<Register />} /> 
            <Route path='/' exact element={<Home />} />   
            <Route path='/terms' exact element={<Terms />} />
            <Route path='/private' exact element={<Private />} />
            </Routes>
        </Router>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;