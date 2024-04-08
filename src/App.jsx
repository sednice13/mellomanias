import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import Header from './components/base/Header'; 
import Footer from './components/base/Footer'; 

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                    
                    <h1>Main Content</h1>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default App;