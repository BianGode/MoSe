import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Outlet, useNavigate} from 'react-router-dom'
import './App.css'
import * as logoGreen from './assets/logos/logoGreen.jpg'
import * as logoBlack from './assets/logos/logoBlack.jpg'
import * as logoWhite from './assets/logos/logoWhite.jpg'

function App() {
  const [theme, setTheme] = useState('')
  const [logo, setLogo] = useState('')


  return (
    <div>
      <div className='selectTheme'>
        <div className='box original active'></div>
        <div className='box black'></div>
        <div className='box white'></div>
      </div>
      <header>
      <img src={logo} alt="logo" />
      {
        // if the homepage active then not show the search icon in the header
        // else do show
      }
      <div className='searchHeader'>
        <img src="faSearch" alt="" />
        <input type="text" />
      </div>
      </header>
      <Outlet />
      <footer></footer>
    </div>
  )
}

export default App
