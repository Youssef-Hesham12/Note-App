import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import Notes from '../Notes/Notes';
import { CounterContext } from '../../Context/CounterContextProvider';
export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [allNotes, setAllNotes] = useState(null)
  let [error, setError] = useState(false)
  let { counter, setCounter } = useContext(CounterContext)
  function handleNote(formValues) {
    axios.post('https://note-sigma-black.vercel.app/api/v1/notes', formValues, { headers: { token: `3b8ny__${localStorage.getItem('token')}` } })
      .then((apiResponse) => {
        console.log(apiResponse);
        setError(false)
        getUserNotes()
      }
      )
      .catch((err) => {
        console.log(err);
        setError(true)

      })
      .finally(() => handleClose())

  }
  function getUserNotes() {
    axios.get('https://note-sigma-black.vercel.app/api/v1/notes', { headers: { token: `3b8ny__${localStorage.getItem('token')}` } })
      .then((res) => {
        console.log(res);
        setError(false)
        setAllNotes(res.data.notes)
        setCounter(res.data.notes.length)

      })
      .catch((err) => {
        console.log(err);
        setError(true)
        setAllNotes(null)

      })
  }
  function deleteNote(id) {
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, { headers: { token: `3b8ny__${localStorage.getItem('token')}` } }).then((res) => {
      console.log(res);
      getUserNotes()

    })
      .catch((err) => {
        console.log(err);

      })
  }

  let Formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: handleNote

  })
  useEffect(() => getUserNotes(), [])
  return (
    <>
      <div className="container d-flex justify-content-end mt-5">
        <Button className='btn' onClick={handleShow}>
          + Add Note
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={style.modalTitle}>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" placeholder="Title" name='title' className='my-3' onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
            <Form.Control as="textarea" rows={3} placeholder='Content' onChange={Formik.handleChange} onBlur={Formik.handleBlur} name='content' />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn' onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={Formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row ">
        {error == true ? <h1 className='ms-3'>No Notes Found</h1> : <>{allNotes?.map((note) => <Notes key={note._id} myNote={note} deleteFunc={deleteNote} getUserNotes={getUserNotes} />)}</>}

      </div>
    </>
  )
}
