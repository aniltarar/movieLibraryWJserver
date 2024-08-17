import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { reset } from '../../redux/slices/userSlice/userSlice';

const Home = () => {
  const { user,isLoading , isError, isSuccess,message } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

if(isLoading){
  return <div>Loading...</div>
}
console.log(user);

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