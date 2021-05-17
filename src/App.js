import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";
import React, {useCallback, useEffect, useState} from 'react';

function App() {
  const [count, setCount] = useState(0)
  const [resposta, setResposta] = useState('');

  const respostaServidor = useCallback((resposta)=>{
    setResposta(resposta);
    setCount(c => c + 1);
  },[])
  

  useEffect(() => {
    const socket = io("http://localhost:4000")

    socket.emit("mensagemCliente",
    "beleza robo babaca eu vou acabar com a sua vida rapaz")

    socket.on('respostaServidor', (resposta) => {
      respostaServidor(resposta);
    })

    return function cleanup(){
      socket.disconnect();
    }
  },[respostaServidor])


  useEffect(() => {
    console.log('servidor respondeu', resposta, count);
  }, [count, resposta])

 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
