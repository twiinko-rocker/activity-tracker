import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState(""); //| State to hold the status from the server

  useEffect(() => { 
    fetch("http://localhost:3000/api/health") //| Fetch the health status from the server
      .then((response) => response.json()) 
      .then((data) => {
        setStatus(data.status);
      })
      .catch((error) => {
        console.error(error);
      }); 
  }, []);

  return (
    <div>
      <h1>Activity Tracker</h1>
      <p>Status: {status}</p>
    </div>
  )
}

export default App;