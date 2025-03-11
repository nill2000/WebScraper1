import { useState } from 'react'
import Login from './components/Login'
import { auth } from './Firebase.js'
import './styles/App.css'

function App() {

  return (
    <div>
      <Login></Login>
    </div>
  )
}

export default App
