import React, { useState } from 'react';
import { Container, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { message } from 'antd';
import axiosInstance from '../common/AxiosInstance';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AllMonthlyPlans from './AllMonthlyPlans';

const MonthlyPlans = () => {
   const [plansDetails, setPlansDetails] = useState({
      workoutTitle: '',
      photo: null,
      price: '',
      duration: '',
      additionalInfo: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPlansDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   const handleDocumentChange = (e) => {
      const file = e.target.files[0];
      setPlansDetails({ ...plansDetails, photo: file });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('workoutTitle', plansDetails.workoutTitle);
      formData.append('price', plansDetails.price);
      formData.append('photo', plansDetails.photo)
      formData.append('duration', plansDetails.duration)
      formData.append('additionalInfo', plansDetails.additionalInfo)

      axiosInstance.post('/api/admin/postitem', formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
         }
      })
         .then((res) => {
            if (res.data.success) {
               message.success(res.data.message);
            } else {
               message.error(res.data.message);
            }
         })
         .catch((error) => {
            message.error(error);
            console.error('Error adding Item:', error);
         });
   };

   return (
      <Container>
         <div className="layout">
            <div className="left">
               <h1 className='text-center text-light'>Add Monthly Plans</h1>
            </div>
            <div className="left">
               <Form
                  style={{ padding: '25px' }}
                  onSubmit={handleSubmit}>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="6">
                        <Form.Label>Title</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="title"
                              aria-describedby="inputGroupPrepend"
                              required
                              name='workoutTitle'
                              value={plansDetails.workoutTitle}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>

                     <Form.Group as={Col} md="6">
                        <Form.Label>Price</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="number"
                              placeholder="price"
                              aria-describedby="inputGroupPrepend"
                              required
                              name='price'
                              value={plansDetails.price}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>

                  </Row>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="6">
                        <Form.Label>Item Images</Form.Label>
                        <Form.Control
                           name='photo'
                           accept='images/*'
                           type="file"
                           onChange={handleDocumentChange}
                           id='photo' />
                     </Form.Group>

                     <Form.Group as={Col} md="6">
                        <Form.Label>duration</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="number"
                              placeholder="duration"
                              required
                              name='duration'
                              value={plansDetails.duration}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <div className="d-flex justify-content-center my-5">
                     <Button variant='contained' size="large" type='submit' startIcon={<AddIcon />}>
                        Add Plan
                     </Button>
                  </div>
               </Form>
            </div>
         </div>
         <AllMonthlyPlans />
      </Container>
   )
}

export default MonthlyPlans