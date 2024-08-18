import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user,isLoading , isError, isSuccess,message } = useSelector((state) => state.user);
  const navigate = useNavigate();

if(isLoading){
  return <div>Loading...</div>
}

useEffect(()=>{
  if(!user){
    navigate("/login")
  }
})

  return (
    <div>Home</div>
  )
}

export default Home