import React from 'react';
import { Container } from 'react-bootstrap';
import basestyles from './styles/basestyles.module.css';

const Header = () => {
    return (
        <Container fluid className={`${basestyles.headerFooter} ${basestyles.header}`}>
            <h2>Mello Manias</h2>
        </Container>
    );
};

export default Header;