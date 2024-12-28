import React, { useState } from 'react'
import AuthCard from '../../components/AuthCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {

  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (form) => {
    const payload = {
      email: form.email,
      password: form.password
    }
    try {
      const res = await axios.post(`https://reqres.in/api/login`, payload);
      console.log(res);
      setSuccess('login Successful!');
      toast.success("Login Successful!", {theme: "colored"});
      localStorage.setItem("token", res.data.token)
      setError('');
      setTimeout(() => {
        navigate("/home");
       }, 4444)
    } catch (error) {
      toast.error('Email or password are incorrect', {theme: "colored"});
      setSuccess('');
      console.log(error);
      
    }
  }


  return (
    <div className="flex items-center justify-center bg-popover p-3 overflow-hidden">
      <div>
        <AuthCard title={`Welcome Back!`} 
                  titleDescription={`Connect to your account`} 
                  isLogin={true} 
                  handleForm={handleLogin}/>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginPage