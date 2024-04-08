import React from 'react';
import { Container } from 'react-bootstrap';
import basestyles from './styles/basestyles.module.css'


const Footer = () => {
    return (
        <Container fluid className={`${basestyles.headerFooter} ${basestyles.footer}`}>
            <h2>Footer</h2>
        </Container>
    );
};

export default Footer;