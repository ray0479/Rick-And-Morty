import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Mensaje from './Mensaje';





export default function Chat() {
  const [mensajes, setMensajes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  function enviarMensaje() {
    if (inputValue.trim()) {
      setMensajes((prevMsg) => [...prevMsg, inputValue]);
      setInputValue('');
    }
  }

  function handleVoiceRecording() {
    if (isRecording) {
      SpeechRecognition.stopListening();
      if (transcript.trim()) {
        setMensajes((prevMsg) => [...prevMsg, transcript]);
        resetTranscript(); 
      }
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsRecording(!isRecording); 
  }

  return (
    <div className='container'>
    <div id="messages">
    <div className='mensaje respuesta'>Pregunta lo que sea sobre rick y morty.</div>
        {mensajes.map((mensaje, index) => (
          <Mensaje key={index} msg={mensaje} />
        ))}
      </div>
    <div className="chatContainer">
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe un mensaje"
        className="msgbox"
      />

      <button onClick={enviarMensaje}>Enviar</button>

      <button
        onClick={handleVoiceRecording}
        style={{
          marginLeft: '10px',
          padding: '5px 10px',
          backgroundColor: isRecording ? 'red' : 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isRecording ? 'Detener Grabación' : 'Grabar Voz'}
      </button>
    </div>
    </div>
  );
}
