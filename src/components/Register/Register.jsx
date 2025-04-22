import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './Register.module.css'
import note from '../../assets/note.gif'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import Alert from 'react-bootstrap/Alert';

export default function Register() {
  let navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false)
  let [apiError, setApiError] = useState("")

  function handleRegister(formValues) {
    setIsLoading(true)
    axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', formValues)
      .then((apiResponse) => {
        setIsLoading(false)
        localStorage.setItem('token', apiResponse.data.token)
        console.log(apiResponse);
        navigate('/login')
      }
      )
      .catch((err) => {
        setIsLoading(false)
        setApiError(err?.response?.data?.msg)

        console.log(err?.response?.data?.msg);
      })

  }
  let validate = Yup.object().shape({
    name: Yup.string().min(3, 'Please enter at least 3 characters.').max(20, 'Name must be no longer than 20 characters.').required('Name is Required'),
    email: Yup.string().email('Email is invalid').required('Email is Required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Must be egyptian phone number.').required('Phone number is Required'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password is invalid').required('Password is Required'),
    age: Yup.number()
      .min(12, 'You must be at least 12 years old')

  })
  let Formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      phone: '',
    },
    validationSchema: validate,
    onSubmit: handleRegister

  })
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 ps-5 ">
            <img src={note} alt="note image" className={style.note} />
          </div>
          <div className="col-md-6">
            <h3 className={style.register}>Register Now</h3>
            <Form onSubmit={Formik.handleSubmit}>
              {apiError ? <Alert variant="danger">
                {apiError}
              </Alert> : null}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className={style.label}>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" name='name' onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              </Form.Group>
              {Formik.errors.name && Formik.touched.name ? <Alert variant="danger">
                {Formik.errors.name}
              </Alert>
                : null}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label className={style.label}>Age</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Age" name='age' onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              </Form.Group>
              {Formik.errors.age && Formik.touched.age ? <Alert variant="danger">
                {Formik.errors.age}
              </Alert>
                : null}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label className={style.label}>Phone</Form.Label>
                <Form.Control type="tel" placeholder="Enter Your Phone Number" name='phone' onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              </Form.Group>
              {Formik.errors.phone && Formik.touched.phone ? <Alert variant="danger">
                {Formik.errors.phone}
              </Alert>
                : null}
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
                <p className={style.special}>Already have an account ? <a href="/login" className={style.span}>Login</a></p>
              </div>
            </Form>

          </div>
        </div>
      </div>
    </>
  )
}
