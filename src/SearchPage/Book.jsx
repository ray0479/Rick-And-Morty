import { useState, React, useEffect, useContext } from 'react'
import Characters from './Characters'
import ErrorBoundary from './ErrorBoundary';
import SearchBox from './SearchBox';
import Arrow from './Arrow';
import Header from '../Header';
import { darkmodeContext } from '../Contexto';

export default function Book() {

    const [characters, setCharacters] = useState([])
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const {darkmode, _} = useContext(darkmodeContext);


    const APIRequest = async (url) => {
            const response = await fetch(url);
            const data = await response.json()
            setNextPage(data.info.next);
            setPrevPage(data.info.prev);
            setCharacters(data.results)
            
    }
    useEffect(() => {
      
      APIRequest('https://rickandmortyapi.com/api/character/')
    }, [])
  return (
    <div className={darkmode ? 'dark' : 'light'}>
      <Header/>
      <div className='container'>
        <ErrorBoundary>
            <SearchBox APIRequest={APIRequest}/>
            <div className='charactersContainer'>
            {characters.map( (character) => (
                <Characters id={character.id} img={character.image} name={character.name} url={'https://rickandmortyapi.com/api/character/'}/>
            ) )}
            </div>
            <div className='pages'>
              <Arrow APIRequest={APIRequest} url={prevPage}> Prev </Arrow><Arrow APIRequest={APIRequest} url={nextPage}>Next</Arrow>
            </div>
        </ErrorBoundary>
      </div>
    </div>
  )
}