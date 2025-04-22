import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import CounterContextProvider from './Context/CounterContextProvider'
function App() {
  let routing = createBrowserRouter([
    {
      path: "", element: <Layout></Layout>, children: [
        { index: true, element:<ProtectedRoute><Home></Home></ProtectedRoute>  },
        { path: 'register', element: <Register></Register> },
        { path: 'login', element: <Login></Login> },
        { path: '*', element: <NotFound></NotFound> },
      ]
    }
  ])
  return (
    <>
    <CounterContextProvider>

      <RouterProvider router={routing}></RouterProvider>
    </CounterContextProvider>
    </>
  )
}

export default App
