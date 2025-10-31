import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'


function App() {
  const {authUser, loading} = useAuthContext()

  if (loading) return <div>Loading...</div>
  return (
    <>
      <Routes>
        <Route path='/' element={authUser ? <HomePage />: <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> :<Navigate to={"/"} />}/>
      </Routes> 
    </>
  )
}

export default App
