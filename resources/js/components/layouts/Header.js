import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) {
    console.log('props :>> ', props);

    const logout = () => {
        console.log("logged out");
        localStorage.removeItem('loginData');
        window.location.href = '/signin';
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">Task Management</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            {
                                props.isLoggedIn && (
                                    <>
                                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                                        <Nav.Link as={Link} to='/about'>About</Nav.Link>
                                        <Nav.Link as={Link} to='/contact'>Contact</Nav.Link>
                                        <Nav.Link as={Link} to='/projects'>Projects</Nav.Link>
                                        <Nav.Link as={Link} to='/logout' onClick={() => logout()}>Log Out</Nav.Link>
                                    </>
                                )
                            }

                            {
                                !props.isLoggedIn && (
                                    <>
                                        <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                                        <Nav.Link as={Link} to='/signin'>Sign In</Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;