import React from 'react';
import { Container } from 'react-bootstrap';
import basestyles from './styles/basestyles.module.css';

const Footer = () => {
    return (
        <Container fluid className={`${basestyles.headerFooter} ${basestyles.footer}`}>
            <a href="/terms"> Terms of conditions</a>
            <a href="/private"> Private policy</a>
        </Container>
    );
};

export default Footer;
