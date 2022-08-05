import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Router from 'next/router';

const Header = () => {
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  const [apiToken, setApiToken] = useState({
    token: null,
  });
  const [localToken, setLocalToken] = useState({
    token: null,
  });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('user-signup')!);
    const tok = JSON.parse(sessionStorage.getItem('token')!);

    setLocalToken(tok);
    setUser(auth);
    if (localToken !== null) {
      const fetchData = async () => {
        const result = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          body: JSON.stringify(auth),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const send = await result.json();
        setApiToken(send);
      };
      const { token: ltok } = localToken;
      const { token: atok } = apiToken;
      if (ltok !== atok) {
        sessionStorage.clear();
        Router.push('/login');
      }
      fetchData().catch(console.error);
    } else {
      sessionStorage.clear();
      Router.push('/login');
    }
  }, []);

  const logoutUser = () => {
    Router.push('/login');
    sessionStorage.clear();
  };

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='../user/'>App</Navbar.Brand>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='../user/account'>My Account</Nav.Link>
              <Nav.Link href='../user/users'>Users</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className='text-white'></Nav.Link>
              <Nav.Link href=''>
                <button onClick={logoutUser} className='btn btn-danger btn-sm'>
                  Logout
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
