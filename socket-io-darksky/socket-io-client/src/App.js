import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';

const App = () => {

  const [response, setResponse] = useState(false);
  const [endpoint] = useState('http://127.0.0.1:4001');
  
  useEffect(() => {
    async function getTemperture() {
      const socket = socketIOClient(endpoint);
      socket.on('FromAPI', data => setResponse(data));
      console.log(response);
    };
    // socketIOClient.connect('http://127.0.0.1:4001', {
    //   'sync disconnect on unload': true
    // });

    getTemperture();

  }, [response]);

  return (
    <div style={{textAlign: 'center'}}>
      {response
        ? <p>The temperature in Florence is: {response} °F</p>
        : <p>Loading...</p>}
    </div>
  );
};

export default App;