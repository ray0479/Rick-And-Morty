import React from 'react'

export default function SearchBox({ APIRequest }) {



    function change(e){
      APIRequest('https://rickandmortyapi.com/api/character/?name=' + e.target.value)
    }

  return (
    <div class="search-box">
      <input type="text" placeholder="Buscar..." id="buscador" onChange={change}/>
      <i class="fa fa-search"></i>
    </div>
  )
}
