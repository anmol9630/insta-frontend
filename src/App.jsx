import React, { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/Layout'
import Home from './components/Home'
import Search from './components/Search'
import Profile from './components/Profile'
import Messages from './components/Messages'
import SignUp from './components/SignUp'
import { LoginProvider } from './context/LoginContext'
import AddPost from './components/AddPost'



const App = () => {
  
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [userDetails , setUserDetals] = React.useState({});
  const login = () => {
    setLoggedIn(true);
  }
  const logout = () => {
    setLoggedIn(false);
  }

  const setUser = (name) => {
    setUsername(name);
  }

  const setUserDetails = (data) => {
    setUserDetals(data);
  }
 

  return (
    <>
      <LoginProvider value={{username,loggedIn,setUser,login,logout,userDetails,setUserDetails}}>
        <BrowserRouter>
          <Routes >
            {!loggedIn && <Route path='/' element={<Login/>}/>}
              <Route path='/' element={<Login/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>} />
              <Route path='/' element={<Layout/>}>
              <Route path='/home' element={<Home/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/messages' element={<Messages/>}/>
              </Route>
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </>
  )
}

export default App