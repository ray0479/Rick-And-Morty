import React from 'react'
import { Link } from 'react-router-dom'
import login from './img/seguridad.png'
import darkmodeimg from './img/modo-oscuro.png'
import { darkmodeContext } from './Contexto';
import { useContext } from 'react'

export default function Header() {
  const {darkmode, setDarkmode} = useContext(darkmodeContext)
  function click(){
    setDarkmode(!darkmode)
    console.log(darkmode)
  }
  return (
    <header>
        <div className='linkscontainer'>
          <Link to='/'>Home</Link>
          <Link to='/SearchPage'>API</Link>
          <Link to='/Accounts'>Accounts</Link>
        </div>
        <div className='btns'>
          <button className='icons'><Link to='/Login' ><img src={login} alt="Login" /></Link></button>
          <button className='icons'><img src={darkmodeimg} alt="Darkmode" onClick={click}/></button>
        </div>
    </header>
  )
}
