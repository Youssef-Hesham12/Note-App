import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './Login.module.css'
import note from '../../assets/note.gif'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import Alert from 'react-bootstrap/Alert';

export default function Login() {
  let navigate = useNavigate()
  let [apiError, setApiError] = useState("")
  let [isLoading, setIsLoading] = useState(false)
  function handleLogin(formValues) {
    setIsLoading(true)
    axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', formValues)
      .then((apiResponse) => {
        setIsLoading(false)
        localStorage.setItem('token' , apiResponse.data.token)
    
        navigate('/')
        console.log(apiResponse);
      }
      )
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
        setApiError(err?.response?.data?.msg)
      })

  }
  let validate = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is Required'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password is invalid').required('Password is Required'),


  })
  let Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validate,
    onSubmit: handleLogin

  })
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 justify-content-center align-items-center ">
            <img src={note} alt="note image" className={style.note} />
          </div>
          <div className="col-md-6 mb-5 pb-5">
            <h3 className={style.register}>Login Now</h3>
            <Form onSubmit={Formik.handleSubmit}>
            {apiError ? <Alert variant="danger">
            {apiError}
            </Alert> : null}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label className={style.label}>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Your Email" name='email' onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              </Form.Group>
              {Formik.errors.email && Formik.touched.email ? <Alert variant="danger">
                {Formik.errors.email}
              </Alert>
                : null}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label className={style.label}>Password</Form.Label>
                <Form.Control type="Password" placeholder="Enter Your Password" name='password' onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              </Form.Group>
              {Formik.errors.password && Formik.touched.password ? <Alert variant="danger">
                {Formik.errors.password}
              </Alert>

                : null}
              <div className="container text-center">
              <Button type="submit" className={style.btn}>{isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}</Button>
                <p className={style.special}>Don't have an account ? <a href="/register" className={style.span}>Register</a></p>
              </div>

            </Form>

          </div>
        </div>
      </div>
    </>
  )
}
