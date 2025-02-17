import React from 'react'



export default function Characters({ img, name }) {
  


  return (
    <div class="card">

      <figure data-color="#E24938, #A30F22">
      <img src={img}/>
    </figure>
  <div class="cta">
    <div class="title">
      {name}
    </div>
    <button class="btn" id="add-cart" >Add to favorite</button>
  </div>
</div>
  )
}