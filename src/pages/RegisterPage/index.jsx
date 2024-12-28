import axios from "axios";
import AuthCard from "../../components/AuthCard"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (form) => {
    const payload = {
      email: form.email,
      password: form.password
    }
    try {
      const res = await axios.post(`https://reqres.in/api/register`, payload);
      console.log(res);
      
      setSuccess('Register Successful!');
      toast.success("Registration successful!");
      setError('');
      setTimeout(() => {
        navigate("/login");
       }, 6666)
    } catch (error) {
      toast.error('Email or password are incorrect!');
      setSuccess('');
    }
  }

  return (
    <div className="flex items-center justify-center bg-popover p-1 md:h-screen overflow-hidden">
      <div >
        <AuthCard title={`Welcome To Social App`} 
                  titleDescription={`Create your own account now!`} 
                  isLogin={false} 
                  handleForm={handleRegister}
        />
      </div>
       <ToastContainer />
    </div>
  )
}

export default RegisterPage