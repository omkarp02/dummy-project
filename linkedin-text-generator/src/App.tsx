import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DropdownForm from './DropdownForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DropdownForm />
    </>
  )
}

export default App
