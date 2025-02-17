import { useContext } from 'react'
import Header from '../Header'
import { Link } from 'react-router-dom'
import Chat from './Chat/Chat'
import './HomePage.css'
import { darkmodeContext } from '../Contexto';

export default function Home() {

  const {darkmode, setDarkmode} = useContext(darkmodeContext);

  return (
    <div className={darkmode ? 'dark' : 'light'}>
      <div className="homepage">
        <Header/>

        <main className="content">
          <img
            src="https://rickandmortyapi.com/icons/icon-512x512.png"
            alt="Rick and Morty Logo"
            className="homepage-logo"
          />
          <Link to="/SearchPage" className="start-button">
            Enter the Multiverse
          </Link>
          <Chat/>
        </main>

        <footer className="footer">
          <p>Powered by the Rick and Morty API</p>
        </footer>
      </div>
    </div>
  )
}
