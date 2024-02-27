import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const NavBar = () => {
   return (
      <Navbar expand="lg" className="bg-body-tertiary" >
         <Container fluid>
            <Navbar.Brand><h2>GymPro</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
               >
               </Nav>
               <Nav>
                  <Link to={'/'}>Home</Link>
                  <Link to={'/login'}>Login</Link>
                  <Link to={'/register'}>Register</Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default NavBar
