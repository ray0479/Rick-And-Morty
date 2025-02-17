import React, { useState, useEffect } from 'react';




export default function Mensaje({ msg }) {
  const [response, setResponse] = useState('...');

  useEffect(() => {
    const fetchData = async () => {
        const res = await fetch('http://localhost:3000/bot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ msg }),
        });

        
        const data = await res.json();

        setResponse(data.text);
      
    };

      fetchData();

  }, [msg]);

  return (
    <div>
      <div className='mensaje pregunta'>{msg}</div>
      <div className='mensaje respuesta'>{response}</div>
    </div>
    
  );
}
