
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Loading() {
  const navigate = useNavigate()

  useEffect(()=>{
    const timeout = setTimeout(() => {
      navigate('/')
    }, 8000);
    return ()=>clearTimeout(timeout)
  },[])
  return (
   <div className='bg-gradient-to-b from-[#531B81] to-[#9184BB] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl'>
    <div className='w-10 h-10 rounded-full border-3 border-white border-t-transparent animate-spin'></div>

   </div>
  )
}

export default Loading









// 🔹 useEffect ka basic

// React me useEffect(()=>{ ... }, []) ka matlab hai:

// Ye code sirf ek baar chalega, jab component first time render hoga (mount hoga).

// Kyonki dependency array empty hai [], isliye dubara re-run nahi hoga (sirf mount pe chalega).

// 🔹 Tumhare code me kya ho raha hai
// useEffect(() => {
//   const timeout = setTimeout(() => {
//     navigate('/')
//   }, 8000);

//   return () => clearTimeout(timeout);
// }, []);


// Jab page render hoga (component mount hoga), tab ye effect run hoga.

// Uske andar setTimeout lag raha hai jo 8 second baad navigate('/') call karega → matlab tumhe 8 sec baad home page pe redirect karega.

// return ()=>clearTimeout(timeout) cleanup hai:

// Agar component unmount ho gaya 8 sec complete hone se pehle, toh timeout cancel ho jayega → unnecessary redirect nahi hoga.