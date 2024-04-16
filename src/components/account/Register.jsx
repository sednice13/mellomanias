import React from "react";
import mystyles from './styles/mystyles.module.css'

import axios from 'axios'
import { Slide } from 'react-awesome-reveal';
import { useState} from "react";
import { useNavigate } from 'react-router-dom'



const Register = () => {

   const navigate = useNavigate()


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
         }

         const config = {
            headers: {
               'Content-Type': 'application/json',
            },

         }
        
         const registerReq = await axios.post('http://localhost:8089/user/register', JSON.stringify(data), config)

         if (registerReq.status === 201) {
            setStatus({

               statustext: registerReq.data.message,
               code: registerReq.status
            })

            setShowStatusAnimation(true)

            setTimeout(() => {
               setShowStatusAnimation(false)
               navigate('/login')
            }, 5000)

         }

       

      } catch (error) {

         

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
      event.preventDefault();
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
