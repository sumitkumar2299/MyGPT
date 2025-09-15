import React, { useState } from 'react'
import Sidebar from './Components/Sidebar'
import { Route,Routes, useLocation } from 'react-router-dom'
import Chatbox from './Components/Chatbox'
import Credits from './Pages/Credits'
import Community from './Pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './Pages/Loading'
import { useAppContext } from './Context/AppContext'
import Login from './Pages/Login'


function App() {

  const {user} = useAppContext()
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const{pathname} = useLocation()
  if(pathname === '/loading') return <Loading/>
  return (
    <>
    {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert'onClick={()=>setIsMenuOpen(true)}/>}

  {user ? (
     <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>

      <div className='flex h-screen w-screen'>
      <Sidebar isMenuOpen = {isMenuOpen} setIsMenuOpen  = {setIsMenuOpen}/>
      <Routes>
        <Route path='/' element = {<Chatbox/>}/>
         <Route path='/credits' element = {<Credits/>}/>
         <Route path='/community' element = {<Community/>}/>

      </Routes>
    </div>

    </div>

  ) :(
    <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
      <Login/>
    </div>
  )}

   
    
    </>
  )
}

export default App










// 🔹 useLocation kya hai?

// Ye React Router ka hook hai (react-router-dom se aata hai).

// Iska kaam hai tumhe current URL/location ki info dena.

// import { useLocation } from 'react-router-dom';

// const location = useLocation();


// Ye location object return karega jisme URL ke different parts hote hain.

// 🔹 Example: Agar URL hai
// http://localhost:3000/about?name=sumit#skills


// Toh useLocation() return karega:

// {
//   pathname: "/about",     // path part
//   search: "?name=sumit",  // query params part
//   hash: "#skills",        // hash part (anchor)
//   state: null,            // optional state (agar navigate ke time bheja ho)
//   key: "somekey"          // react-router ka internal key
// }

// 🔹 Tumhare code me
// const { pathname } = useLocation();


// Iska matlab hai tumne location object se sirf pathname destructure kar liya.

// 👉 Ab pathname me hamesha current route ka path aayega.

// Agar tum / pe ho → pathname = "/"

// Agar tum /about pe ho → pathname = "/about"

// Agar tum /contact pe ho → pathname = "/contact"

// 🔹 Use cases

// Active Link Highlighting
// Navbar me check karne ke liye ki konsa link active hai:

// const { pathname } = useLocation();
// return (
//   <nav>
//     <Link to="/" className={pathname === "/" ? "active" : ""}>Home</Link>
//     <Link to="/about" className={pathname === "/about" ? "active" : ""}>About</Link>
//   </nav>
// );


// Conditionally Component Render
// Agar kisi path pe ho to alag UI dikhana:

// if (pathname === "/login") {
//   return <LoginPage />
// }


// Analytics / Logging
// Jab bhi URL change ho, uska record rakhna.

// ⚡Short me:
// useLocation() current URL ka pura object deta hai.
// pathname specifically tumhe current path deta hai.