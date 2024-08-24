import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../../redux/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user,isLoading , isError, isSuccess,message ,} = useSelector((state) => state.user);


  const [formData, setFormData] = useState({
    username: "",
    email:"",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  }

useEffect(()=>{
  if(isSuccess||user){
    navigate("/")
  }
})

  return (
    <div className="d-flex align-items-center justify-content-center my-5 p-5">
      <form className="p-5 border shadow rounded d-flex flex-column gap-4 w-50" onSubmit={handleSubmit}>
        <h1>Kayıt Ol</h1>
        <input
          className="form-control"
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <input
          className="form-control"
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          className="form-control"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
