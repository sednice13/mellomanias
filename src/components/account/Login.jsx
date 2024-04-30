import React, { useState, useContext } from "react";
import mystyles from './styles/mystyles.module.css'
import { Slide } from 'react-awesome-reveal';
import {AuthContext} from './Authcontext'
import { useNavigate } from 'react-router-dom'











const Login = () => {

   const navigate = useNavigate()

   const [formValue, setformValue] = React.useState({
      username: '',
      password: '',


   });
   
   const [status, setStatus] = React.useState({

      statustext: null,
      code: null
   })
   const [showStatusAnimation, setShowStatusAnimation] = React.useState(false)
   const { login } = useContext(AuthContext);

  

   

   const handleSubmit = async (e) => {

    

      try {
         e.preventDefault()
         const response = await login(formValue.username, formValue.password)
      
         setStatus({

            statustext: response.data.message,
            code: response.status
         })

         setShowStatusAnimation(true)

         setTimeout(() => {
            setShowStatusAnimation(false)
            if(response.status === 201) {
               navigate('/')
            }
         }, 5000)

        
         
      }

       catch (error) {
         
         setStatus({

            statustext: error.response.data.message,
            code: error.response.data.status
         })

         setShowStatusAnimation(true)

         setTimeout(() => {
            setShowStatusAnimation(false)
         }, 5000)

         

      }

   }
   

   const handleChange = (event) => {
      setformValue({
         ...formValue,
         [event.target.name]: event.target.value,


      });


   }

   return (

      <div className={mystyles.accountsection}>

         {showStatusAnimation && (
            <Slide right>
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

               <input type='text' className={mystyles.inputs} name='username' onChange={handleChange}>

               </input>


               <label className={mystyles.labels}>
                  Password
               </label>

               <input type='password' className={mystyles.inputs} name="password" onChange={handleChange}>

               </input>
               
               <button className={mystyles.coonectbutton}>log in.  </button>

               <p> Terms of Service</p>

            </form>

         </div>
         </div>

    
   )


}



export default Login