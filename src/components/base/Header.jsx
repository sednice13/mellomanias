import React from 'react';
import { Container } from 'react-bootstrap';
import basestyles from './styles/basestyles.module.css';

const Header = () => {
    return (
        <Container fluid className={`${basestyles.headerFooter} ${basestyles.header}`}>
            <a href="/create-account" className={basestyles.headerstyles}>Register</a>
            <a href="/login" className={basestyles.headerstyles}>Login</a>
            <img src="https://i.imgur.com/wpSjCRM.png" alt="Beskrivande text" className={basestyles.imageheader} />
            <a href="" className={basestyles.headerstyles} >Forum</a>
            <a href="" className={basestyles.headerstyles}>Contact us</a>
        </Container>
    );
};

export default Header;