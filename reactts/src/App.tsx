import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const changeNumber = (num: number) => {
    setCount(num) 
  }
  return (
    <div className='App'>

    </div>
  )
}

export default App
