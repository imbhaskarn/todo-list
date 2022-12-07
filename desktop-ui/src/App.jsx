import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Todo from './components/Todo.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <Todo/>
    </div>
  )
}

export default App
