import React from 'react'

export default function ({children, APIRequest, url}) {

    async function click() {
        if(url != null){
            APIRequest(url)
        }
    }

  return (
    <div>
        <button className='btn' onClick={click}>{children}</button>
    </div>
  )
}
