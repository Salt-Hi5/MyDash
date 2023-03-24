import React, { useState, useEffect } from 'react'
import { User } from "../Types/Types"
import { getUsers } from "../Services/apiClient"
import './App.css'

function App() {
  const [ users, setUsers ] = useState<User[]>([]);

  useEffect(() => {
    const initialSetup = async () => {
      setUsers(await getUsers());
    }
    initialSetup();
  }, []);

  if (users === null) return <div>Loading...</div>

  return (
    <div className="App">
      <h1 className="header">
        Welcome {users[0].nickname}!
      </h1>
    </div>
  )
}

export default App
