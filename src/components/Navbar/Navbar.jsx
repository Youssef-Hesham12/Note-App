import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/sticky-notes.png'
import { useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/CounterContextProvider';
export default function NavBar() {
  let userToken = localStorage.getItem('token')
  let navigate = useNavigate()
  let { counter, setCounter } = useContext(CounterContext)
  function logOut() {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
      <Navbar expand="lg" className={style.bgHero}>
        <Container>
          <div className={style.Container}>

            <img src={logo} alt="logo" className={style.logo} />
            <Navbar.Brand href="/" className={style.Brand}>Sticky App</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        {userToken == null ?
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={style.validateFont}>
              <Nav.Link href="/login" className={style.space}>Login</Nav.Link>
              <Nav.Link href="/register" className={style.space}>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse> :
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={style.validateFont}>

              <Nav.Link className={style.space} >
                <i className="fa-solid fa-box-open me-2 position-relative">
                  <span className="position-absolute  num start-50 translate-middle badge text-dark  ">
                    {counter}
                    
                  </span>
                </i>
                <span onClick={logOut}>Log Out</span></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        }
      </Navbar>
    </>
  )
}
