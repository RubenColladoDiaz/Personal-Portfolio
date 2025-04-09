import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'

function App() {

  return (
    <div className='pt-10 pb-20'>
      <Header />
      <Home />
    </div>
  )
}

export default App
