import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { reset } from '../redux/slices/userSlice/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const clearUser = () => {
    localStorage.removeItem('user')
    dispatch(reset())
    navigate("/login")
    
  }
  
  
  const { user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.user)

  return (
    <header className='d-flex p-3 align-items-center justify-content-around gap-5 bg-dark'>
            <Link to='/' className='text-decoration-none fs-4 text-light'>Home</Link>
            <Link to='/login' className='text-decoration-none fs-4 text-light'>Login</Link>
            <Link to='/register' className='text-decoration-none fs-4 text-light'>Register</Link>
            <Link to='/movies' className='text-decoration-none fs-4 text-light'>Movies</Link>
            <Link to='/add-movie' className='text-decoration-none fs-4 text-light'>Add Movie</Link>
            <div className="rigth">

             {
                user ? (
                  <div className='d-flex gap-3'>
                    <span  className='text-decoration-none fs-4 text-light'>{user.username}</span>
                    <button onClick={clearUser} className='btn btn-danger'>Logout</button>
                  </div>
                ) : null
             }
            
            </div>
        </header>
  )
}

export default Header