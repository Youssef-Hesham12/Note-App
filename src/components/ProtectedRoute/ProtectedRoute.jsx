import React, { useEffect } from 'react'
import { useState } from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute(props) {
  // console.log(props);
  if(localStorage.getItem('token') !==null){
    return props.children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}