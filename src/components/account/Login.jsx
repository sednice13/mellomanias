import React, { useState, useContext } from "react";
import mystyles from './styles/mystyles.module.css';
import { Slide } from 'react-awesome-reveal';
import { AuthContext } from './Authcontext';
import { useNavigate } from 'react-router-dom';
import { useStatus } from "../status/StatusContext";

const Login = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });

  const { login } = useContext(AuthContext);
  const { updateStatus } = useStatus();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await login(formValue.username, formValue.password);
      updateStatus(response.status, response.data.message);

      if(response.status === 201) {
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    } catch (error) {
      updateStatus(error.response.status, error.response.data.message);
    }
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={mystyles.accountsection}>
      <div className={mystyles.postiontext}>
      <Slide direction="left">   
      <h2 > LOGGA IN </h2>
      </Slide>
      </div>
      <div className={mystyles.fulldivcontent}>
        <img src="https://i.imgur.com/wpSjCRM.png" alt="Beskrivande text" />
        <form className={mystyles.signinform} onSubmit={handleSubmit}>
          <label className={mystyles.labels}>Username</label>
          <input type='text' className={mystyles.inputs} name='username' onChange={handleChange} />
          <label className={mystyles.labels}>Password</label>
          <input type='password' className={mystyles.inputs} name="password" onChange={handleChange} />
          <button className={mystyles.coonectbutton}>Log in</button>
          <p>Terms of Service</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
