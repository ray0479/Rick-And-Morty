import React from 'react'
import { useContext } from 'react'
import Header from '../Header'
import { usernameContext } from '../Contexto';
import { darkmodeContext } from '../Contexto';

export default function Accounts() {
    const {username, _} = useContext(usernameContext);
    const {darkmode, __} = useContext(darkmodeContext);
  return (
    <div className={darkmode ? 'dark' : 'light'}>
      <div className='accountContainer'>
          <Header/>
          <main>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <p>Bienvenido, {username}</p>
          </main>
      </div>
    </div>
  )
}
