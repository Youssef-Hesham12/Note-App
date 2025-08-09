import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './Footer.module.css'
export default function Footer() {
  return (
    <>
      <footer className=" text-center  border-top ">
        <div className="container ">
          <p className={style.footer}>   &copy; 2025 Youssef Hesham.All Rights Reserved.</p>
          
        </div>
      </footer>
    </>
  )
}
