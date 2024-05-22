import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import basestyles from './styles/basestyles.module.css';
import { AuthContext } from '../account/Authcontext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { auth, LogOut } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogOut = async () => {
        LogOut();
    };
    

    const toHome = () => {
        navigate('/')
    }

    return (
        <Container fluid className={`${basestyles.headerFooter} ${basestyles.header}`}>
            <div className={basestyles.headerLeft}>
                {auth.user && auth.user.sub ? (
                    <>
                        <a className={basestyles.headerstyles} href='' >{auth.user.sub}</a>
                        <a onClick={handleLogOut} className={basestyles.headerstyles} href=''>Logout</a>
                    </>
                ) : (
                    <>
                        <a href="/create-account" className={basestyles.headerstyles}>Register</a>
                        <a href="/login" className={basestyles.headerstyles}>Login</a>
                    </>
                )}
            </div>
            <div className={basestyles.logoContainer}>
                <img src="https://i.imgur.com/wpSjCRM.png" alt="Descriptive text" className={basestyles.imageheader} onClick={() => toHome()}  />
            </div>
            <div className={basestyles.headerRight}>
                <a href="/forum" className={basestyles.headerstyles}>Forum</a>
                <a href="" className={basestyles.headerstyles}>Contact</a>
            </div>
        </Container>
    );
};

export default Header;
