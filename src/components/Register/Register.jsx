import React, { useState } from 'react'
import api from '../../shared/API/Api'
import './Register.css'

const Register = ({
    setUser,
    setFilter,
}
    
) => {
const [registerUser, setRegisterUser] = useState('');
const [registerPasword, setRegisterPasword] = useState('');
const [registerConfirmPasword, setRegisterConfirmPasword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const fnRegister = () =>{

    if(registerPasword !== registerConfirmPasword){
        setErrorMessage('Les contrasenyes han de ser iguals')
    }
    if(registerPasword === registerConfirmPasword){
        const registerData = {
            mail: registerUser,
            password: registerPasword,
        }
        

        api.post('/users/register',registerData)
            .then((response) => {
              api.post('/userData/new', {userId: response.userDB._id})  
            })
            .then(() => fnLogin())
           
    }

}

const fnLogin = () => {
    const loginData = {
        mail: registerUser,
        password: registerPasword,
      };

      api
        .post("/users/login", loginData)
        .then(async (response) => {
            localStorage.setItem("token", response.token);
            setUser(response.userDB);
            setFilter('listView')
    
          
        })
        .catch((error) => {
          console.log("Error en la llamada a la API:", error);
        });

  };

  return (
    <div className='registerContainer'>
      <div className='registerItems'>
        <input onChange={(e) => setRegisterUser(e.target.value)}  placeholder='introdueix mail'/>
      </div>
      <div className='registerItems'>
        <input onChange={(e) => setRegisterPasword(e.target.value)} placeholder='introdueix contrasenya'/>
      </div>
      <div className='registerItems'>
        <input onChange={(e) => setRegisterConfirmPasword(e.target.value)} placeholder='confirma contrasenya'/>
      </div>
      <div className='registerItems'>
         <button onClick={()=>fnRegister()} className='btnNavbar'>Registrar</button>
      </div>
        
        
       
        {errorMessage && (
            <p>{errorMessage}</p>
        )}
    </div>
  )
}

export default Register