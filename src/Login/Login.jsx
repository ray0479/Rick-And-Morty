import React from 'react'
import './Login.css'
import { usernameContext } from '../Contexto';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { darkmodeContext } from '../Contexto';

export default function Login() {
    const {__, setUsername} = useContext(usernameContext);
    const {darkmode, _} = useContext(darkmodeContext);
    let inputValue = ""
    function click(){
        setUsername(inputValue)
    }
  return (
    <div className={darkmode ? 'dark' : 'light'}>
        <div class="login">
            <h2>Login</h2>
            <div class="input">
                <input type="text" placeholder='Username'
                onChange={(e) => inputValue = e.target.value}/>
            </div>
            <div class="input">
                <input type="text" placeholder='Password' />
            </div>
            <div id='submit'><Link to='/'><input type="submit" value="login" className='btn' onClick={click}/></Link></div>
        </div>
    </div>
  )
}
