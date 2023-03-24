import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

  return (
    <div className="App">
      <p className="read-the-docs">
        Welcome {users[0].nickname}!
      </p>
    </div>
  )
}

export default App
