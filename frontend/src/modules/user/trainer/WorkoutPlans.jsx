import React, { useState } from 'react';
import { Container, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import { message } from 'antd';
import axiosInstance from '../../common/AxiosInstance';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AllWorkoutPlans from './AllWorkoutPlans';

const WorkoutPlans = () => {
   const [workoutDetails, setWorkoutDetails] = useState({
      muscleTargeted: '',
      otherMuscle: "",
      workoutTitle: '',
      photo: null,
      duration: '',
      additionalInfo: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setWorkoutDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   const handleDocumentChange = (e) => {
      const file = e.target.files[0];
      setWorkoutDetails({ ...workoutDetails, photo: file });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('workoutTitle', workoutDetails.workoutTitle);
      formData.append('muscleTargeted', workoutDetails.muscleTargeted);
      formData.append('additionalInfo', workoutDetails.additionalInfo);
      formData.append('photo', workoutDetails.photo);
      formData.append('duration', workoutDetails.duration);

      if (workoutDetails.muscleTargeted === 'Others') {
         formData.append("otherMuscle", workoutDetails.otherMuscle);
      }

      axiosInstance.post('/api/user/trainer/postworkoutplan', formData, {
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
            message.error(error.message);
            console.error('Error adding Item:', error);
         });
   };

   return (
      <Container>

         <div className="layout">
            <div className="left">
               <h1 className='text-center text-light '>Add Workout Plans</h1>
            </div>
            <div className="left">
               <Form
                  style={{ padding: '25px' }}
                  onSubmit={handleSubmit}>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="6">
                        <Form.Label>Workout Title</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="title"
                              required
                              name='workoutTitle'
                              value={workoutDetails.workoutTitle}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                     <Form.Group as={Col} md="6">
                        <Form.Label>Target Muscle</Form.Label>
                        <Form.Select name='muscleTargeted' value={workoutDetails.muscleTargeted} onChange={handleChange}>
                           <option value="">Choose...</option>
                           <option>Calf</option>
                           <option>Shoulders</option>
                           <option>Chest</option>
                           <option>Others</option>
                        </Form.Select>
                     </Form.Group>
                  </Row>
                  <Row>

                     {workoutDetails.muscleTargeted === "Others" && (

                        <Form.Group as={Col} md="6">
                           <Form.Label>Specify Other Muscle</Form.Label>
                           <InputGroup hasValidation>
                              <Form.Control
                                 type="text"
                                 placeholder="Other muscle"
                                 name='otherMuscle'
                                 value={workoutDetails.otherMuscle}
                                 onChange={handleChange}
                              />
                           </InputGroup>
                        </Form.Group>
                     )}
                     <Form.Group as={Col} md="6">
                        <Form.Label>Workout Duration</Form.Label>
                        <Form.Select name='duration' value={workoutDetails.duration} onChange={handleChange}>
                           <option value="">Choose...</option>
                           <option>3 days</option>
                           <option>4 days</option>
                           <option>5 days</option>
                        </Form.Select>
                     </Form.Group>
                  </Row>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="12">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control name='photo' accept='images/*' type="file" onChange={handleDocumentChange} id='photo' />
                     </Form.Group>

                     <FloatingLabel
                        label="Additional details for the Plan"
                        className="mt-4"
                     >
                        <Form.Control name='additionalInfo' value={workoutDetails.additionalInfo} onChange={handleChange} as="textarea" />
                     </FloatingLabel>
                  </Row>
                  <div className="d-flex justify-content-center my-5">
                     <Button variant='contained' size="large" type='submit' startIcon={<AddIcon />}>
                        Add Workout
                     </Button>
                  </div>
               </Form>
            </div>
         </div>
         <AllWorkoutPlans />
      </Container>
   )
}

export default WorkoutPlans;
