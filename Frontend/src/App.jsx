import React from 'react'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/auth/pages/Home'
import Navbar from './features/auth/pages/Navbar'
import Jobs from './features/auth/pages/Jobs'
import PostJob from './features/auth/pages/PostJob'
import MyApplications from './features/auth/pages/MyApplications'
import RecruiterPage from './features/auth/pages/RecruiterPage'
import ProtectedRoutes from './features/auth/routes/ProtectedRoutes'
import Midesection from './features/auth/pages/Midesection'
import FooterCards from './features/auth/pages/FooterCards'
import Footer from './features/auth/pages/Footer'
import ViewApplicants from './features/auth/pages/ViewApplicants'
import { Routes, Route } from 'react-router'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<> <Home /> <Midesection /> <FooterCards /> <Footer /> </>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/recruiter' element={<ProtectedRoutes> <RecruiterPage /> </ProtectedRoutes>} />
        <Route path='/myapp' element={<ProtectedRoutes> <MyApplications /> </ProtectedRoutes>} />
        <Route path='/postedBy' element={<ProtectedRoutes> <PostJob /> </ProtectedRoutes>} />
        <Route path='/jobs' element={<ProtectedRoutes> <Jobs /> </ProtectedRoutes>} />
        <Route path='/applicants/:id' element={<ProtectedRoutes><ViewApplicants /></ProtectedRoutes>} />
      </Routes>
    </>
  )
}

export default App