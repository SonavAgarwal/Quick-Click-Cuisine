import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Order } from './components/Order'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Order></Order>
      <Order></Order>
      <Order></Order>
  
    </div>)
}

export default App
