import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import MyProjects from './components/MyProjects/MyProjects'
import Experience from './components/Experience/Experience'

function App() {
  return (
    <div className='pt-10 pb-20'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprojects" element={<MyProjects />} />
        <Route path='/experience' element={<Experience />} />
      </Routes>
    </div>
  )
}

export default App
