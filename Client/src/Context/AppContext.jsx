import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUserData,dummyChats } from "../assets/assets";

const AppContext = createContext()

export const AppContextProvider = ({children})=>{
    const navigate = useNavigate()
    const[user,SetUser] = useState(null);
    const [chats,SetChats] = useState([]);
    const[selectedChat,SetSelectedChat] = useState(null);

    const [theme,SetTheme] = useState(localStorage.getItem('theme') || 'light')
    const fetchUser  = async () => {
        SetUser(dummyUserData) // ye assests folder mein dummyUserData name ka function 
    }


    const fetchUserChats = async () => {
        SetChats(dummyChats)  // dummyChats function assests folder mein assests.js fie mein hain 
        SetSelectedChat(dummyChats[0])
    }

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark')
        }

        localStorage.setItem('theme',theme)

    },[theme])

    useEffect(()=>{
        if(user){
            fetchUserChats()
        }
        else{
            SetSelectedChat([])
            SetSelectedChat(null)
        }

    },[user])

    useEffect(()=>{
        fetchUser()

    },[])




    

    const value = {
        navigate,user,SetUser,fetchUser,chats,SetChats,selectedChat,SetSelectedChat,theme,SetTheme
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () =>useContext(AppContext)