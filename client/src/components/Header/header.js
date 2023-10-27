import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
import './header.css';
import { useEffect, useState } from 'react';
import {themePalette} from '../../theme/theme';

const Header = ({ onLogout }) => {
    const token = sessionStorage.getItem('jwtToken');
    const [navItemId, setNavItemId] = useState('1');

    const location = useLocation();

    useEffect(() => {
        setNavItemId(location.pathname)
    },[location])

    const handleChange = (id) => {
        setNavItemId(id);
    };

    const navLinks = [
        { id: '1', to: '/', text: 'HOME' },
        { id: '2', to: '/about', text: 'ABOUT US' },
        { id: '3', to: '/services', text: 'SERVICES' },
        { id: '4', to: '/contact', text: 'CONTACT' },
    ];

    return (
        <Navbar
            fixed="top"
            className="p-2"
            expand="lg"
            bg="dark"
            variant="dark"
            style={{minHeight:'10vh',opacity:'0.8'}}
        >
            <div className="container-fluid">
                <Navbar.Brand>
                    <Link to="/" className="nav-link">
                        <div className='logo-text'>
                            <p className='m-0 p-0' style={{fontSize:'34px'}}>TAX</p>
                            <p className='m-0 p-0'>Return</p>
                        </div>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" id="navbar-toggle" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <div className='w-100 d-flex align-items-center justify-content-md-end'>
                        <Nav className="ml-auto">
                            {navLinks.map((link, index) => (
                                <NavLink
                                    key={index}
                                    to={link.to}
                                    className="nav-link text-center"
                                    style={{
                                        borderRadius: '5px',
                                        marginRight: '10px',
                                        border: navItemId === link.to ? '2px solid' : 'initial',
                                        color: navItemId === link.to ? `${themePalette.yellow}` : `${themePalette.dark}`,
                                    }}
                                    onClick={() => {
                                        handleChange(link.id);
                                    }}
                                >
                                    {link.text}
                                </NavLink>
                            ))}
                            <button className="btn btn-warning ml-2 d-flex align-items-center pl-2 pr-2 pt-0 pb-0" onClick={() => {handleChange('')}}>
                                <BiLogIn />
                                {!token ? (
                                    <NavLink to="/login" className="nav-link text-dark">
                                        Login
                                    </NavLink>
                                ) : (
                                    <Link to="/" className="nav-link" onClick={onLogout}>
                                        Logout
                                    </Link>
                                )}
                            </button>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;
