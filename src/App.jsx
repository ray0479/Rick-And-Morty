import Book from './SearchPage/Book'
import Home from './HomePage/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Login/Login';
import { Provider } from './Contexto';
import Accounts from './Accounts/Accounts';
import Reports from './Reportes/Reports';

function App() {


  
  return (
      <Provider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SearchPage" element={<Book />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Accounts' element={<Accounts />} />
            <Route path='/Reports' element={<Reports />} />
          </Routes>
        </Router>
      </Provider>
  )
}

export default App
