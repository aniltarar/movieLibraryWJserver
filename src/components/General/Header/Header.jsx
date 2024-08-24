// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { reset } from '../../../redux/slices/userSlice/userSlice'
// import { useDispatch, useSelector } from 'react-redux'

// const Header = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const clearUser = () => {
//     localStorage.removeItem('user')
//     dispatch(reset())
//     navigate("/login")
    
//   }
  
  
//   const { user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.user)

//   return (
//     <header className='d-flex p-3 align-items-center justify-content-around gap-5 bg-dark'>
//             <Link to='/' className='text-decoration-none fs-4 text-light'>Home</Link>
//             <Link to='/login' className='text-decoration-none fs-4 text-light'>Login</Link>
//             <Link to='/register' className='text-decoration-none fs-4 text-light'>Register</Link>
//             <Link to='/movies' className='text-decoration-none fs-4 text-light'>Movies</Link>
//             <Link to='/add-movie' className='text-decoration-none fs-4 text-light'>Add Movie</Link>
//             <Link to='/my-movies' className='text-decoration-none fs-4 text-light'>My Movies</Link>
//             <div className="rigth">

//              {
//                 user ? (
//                   <div className='d-flex gap-3'>
//                     <span  className='text-decoration-none fs-4 text-light'>{user.username}</span>
//                     <button onClick={clearUser} className='btn btn-danger'>Logout</button>
//                   </div>
//                 ) : null
//              }
            
//             </div>
//         </header>
//   )
// }

// export default Header

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { reset } from '../../../redux/slices/userSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Aktif sayfayı belirlemek için kullanılır
  const clearUser = () => {
    localStorage.removeItem('user');
    dispatch(reset());
    navigate("/login");
  };

  const { user } = useSelector((state) => state.user);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/movies" 
              className={location.pathname === '/movies' ? 'active' : ''}
            >
              Movies
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/add-movie" 
              className={location.pathname === '/add-movie' ? 'active' : ''}
            >
              Add Movie
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/my-movies" 
              className={location.pathname === '/my-movies' ? 'active' : ''}
            >
              My Movies
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Nav.Item className="d-flex align-items-center gap-3">
                <span className="text-light">{user.username}</span>
                <Button variant="danger" onClick={clearUser}>Logout</Button>
              </Nav.Item>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  className={location.pathname === '/login' ? 'active' : ''}
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/register" 
                  className={location.pathname === '/register' ? 'active' : ''}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
