import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../../redux/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
    dispatch(loginUser(formData));
  };


  useEffect(()=>{
    if(isSuccess||user){
      navigate("/")
    }
  },[isSuccess])



  return (
    <div className="d-flex align-items-center justify-content-center my-5 p-5">
      <form
        className="p-5 border shadow rounded d-flex flex-column gap-4 w-50"
        onSubmit={handleSubmit}
      >
        <h1>Giriş Yap</h1>
        <input
          className="form-control"
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          className="form-control"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
