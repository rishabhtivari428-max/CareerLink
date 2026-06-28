import React from 'react'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/auth/pages/Home'
import Navbar from './features/auth/pages/Navbar'
import Jobs from './features/auth/pages/Jobs'
import PostJob from './features/auth/pages/PostJob'
import MyApplications from './features/auth/pages/MyApplications'
import RecruiterPage from './features/auth/pages/RecruiterPage'
import { Routes, Route, Router } from 'react-router'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recruiter' element={<RecruiterPage />} />
        <Route path='/myapp' element={<MyApplications />} />
        <Route path='/postedBy' element={<PostJob />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/jobs' element={<Jobs />} />
      </Routes>
    </>
  )
}

export default App