import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './Notes.module.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
export default function Notes({ myNote, deleteFunc, getUserNotes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function updateNote(formValues) {
    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${myNote._id}`, formValues, { headers: { token: `3b8ny__${localStorage.getItem('token')}` } })
      .then((apiResponse) => {
        console.log(apiResponse);
        getUserNotes()
      }
      )
      .catch((err) => {
        console.log(err);


      })
      .finally(() => handleClose())

  }
  let Formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: updateNote

  })
  return (
    <>


      <div className="col-md-3 my-3 px-4">
        <Card className={style.card}>
          <Card.Header>{myNote.title}</Card.Header>
          <Card.Body>
            <Card.Text>
              {myNote.content}
            </Card.Text>
            <div className='d-flex justify-content-end'>
              <span className={style.pointer}> <i className="fa-solid fa-trash m-2 text-danger  " onClick={() => deleteFunc(myNote._id)}></i> </span>
              <span className={style.pointer}>     <i className="fa-solid fa-pen-to-square m-2 text-success" onClick={() => handleShow()}></i></span>
            </div>
          </Card.Body>
        </Card>


      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={style.modalTitle}>Update Note</Modal.Title>
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
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
