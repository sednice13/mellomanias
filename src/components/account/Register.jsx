import React from "react";
import mystyles from './styles/mystyles.module.css'

import axios from 'axios'
import { Slide } from 'react-awesome-reveal';
import { useState} from "react";
import { useNavigate } from 'react-router-dom'

import { useStatus } from "../status/StatusContext";



const Register = () => {

   const navigate = useNavigate()

   const { updateStatus } = useStatus()
   const [formValue, setformValue] = useState({
      username: '',
      password: '',
      mail: ''

   });

   const [status, setStatus] = React.useState({

      statustext: null,
      code: null
   })
   const [showStatusAnimation, setShowStatusAnimation] = React.useState(false)


   const handleSubmit = async (e) => {


      e.preventDefault();



      try {
         const data = {
             user: formValue.username,
             password: formValue.password,
             mail: formValue.mail
         };
     
         const config = {
             headers: {
                 'Content-Type': 'application/json',
             },
         };
     
         const registerReq = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, JSON.stringify(data), config);
     
         if (registerReq.status === 201) {
             updateStatus(
                
                 registerReq.status,
                  registerReq.data.message
                );
     
             
     
             setTimeout(() => {
                 
                 navigate('/login');
             }, 5000);
         }
     } catch (error) {
         if (error.response) {
             setStatus(

                  error.response.status,
                  error.response.data.message
             );
         } else {
             // Handle cases where the error does not come from a HTTP response
             setStatus({
                 statustext: "An unexpected error occurred. Please try again later.",
                 code: "Error"
             });
         }
     
         setShowStatusAnimation(true);
     
         setTimeout(() => {
             setShowStatusAnimation(false);
         }, 5000);
     }
     

   }

   const handleChange = (event) => {
      event.preventDefault();
      setformValue({
         ...formValue,
         [event.target.name]: event.target.value,
      });


   }
   return (


      <div className={mystyles.accountsection}>
         <div className={mystyles.postiontext}>
      <Slide direction="left">   
      <h2 > REGISTRERA DIG </h2>
      </Slide>
      </div>
         {showStatusAnimation && (
            <Slide direction="right">
               <div className={mystyles.statusdiv} style={{
                  backgroundColor: status.code === 201 ? 'green' : 'red',
               }}>
                  <p> {status.code} {status.statustext}</p>

               </div>
            </Slide>
         )}

         <div className={mystyles.fulldivcontent}>


         <img src="https://i.imgur.com/wpSjCRM.png" alt="Beskrivande text" />

            <form className={mystyles.signinform} onSubmit={handleSubmit} >



               <label className={mystyles.labels}>
                  Username
               </label>

               <input type='text' className={mystyles.inputs} value={formValue.username} name='username' onChange={handleChange}>

               </input>


               <label className={mystyles.labels}>
                  Mail Adress
               </label>

               <input type='text' className={mystyles.inputs} name="mail" onChange={handleChange}>

               </input>

               <label className={mystyles.labels}>
                  Password
               </label>



               <input type='password' className={mystyles.inputs} name="password" onChange={handleChange}>

               </input>

               <button className={mystyles.coonectbutton}>Register </button>

               <p> Terms of Service</p>

            </form>


         </div>
      </div>
   )


}


export default Register
