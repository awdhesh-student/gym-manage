import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { message } from 'antd';
import NavBar from './NavBar';
import { Container, Dropdown, Form, Row, Col, InputGroup } from 'react-bootstrap';
import axiosInstance from "./AxiosInstance"
const Register = () => {
   const navigate = useNavigate()

   const [selectedOption, setSelectedOption] = useState('Select User');
   const [data, setData] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      type: "",
      bmi: ""
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSelect = (eventKey) => {
      setSelectedOption(eventKey);
      setData({ ...data, type: eventKey });
   };

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!data?.fname || !data?.lname || !data?.email || !data?.password) return alert("Please fill all fields");
      else {
         axiosInstance.post('/api/user/register', data)
            .then((response) => {
               if (response.data.success) {
                  message.success(response.data.message);
                  navigate('/login')

               } else {
                  message.error(response.data.message)
               }
            })
            .catch((error) => {
               console.log("Error", error);
            });
      }
   };
   return (
      <div>
         <NavBar />
         <div className="first-container">

            <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
               <Box
                  sx={{
                     marginTop: 4,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     padding: 5,
                     background: '#5a605fd4',
                     borderRadius: '5px'
                  }}
               >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign up
                  </Typography>
                  {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                     padding: "25px"
                  }}>
                     <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Enter Full Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        autoComplete="name"
                        autoFocus
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Enter Email Address"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        label="Enter Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     <Dropdown className='my-3 d-flex'>
                        <Dropdown.Toggle variant="contained-primary" id="dropdown-basic">
                           {selectedOption}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                           <Dropdown.Item onClick={() => handleSelect("Customer")}>Customer</Dropdown.Item>
                           <Dropdown.Item onClick={() => handleSelect("Trainer")}>Trainer</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                     <TextField
                        margin="normal"
                        fullWidth
                        name="bmi"
                        value={data.bmi}
                        onChange={handleChange}
                        label="Enter your bmi"
                        type="text"
                        id="bmi"
                     />
                     <Box
                        mt={2}
                        className="d-flex flex-column align-items-center "
                     >
                        <Button
                           type="submit"
                           variant="contained"
                           style={{ width: '200px' }}
                        >
                           Sign Up
                        </Button>
                        <span>Have an account?<Link style={{ color: "#090987" }} to={'/login'} variant="body2">
                           Sign In
                        </Link></span>
                     </Box>
                  </Box> */}

                  <Form
                     style={{ padding: '25px' }}
                     onSubmit={handleSubmit}>
                     <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                           <Form.Label>First Name</Form.Label>
                           <InputGroup hasValidation>
                              <Form.Control
                                 name="name"
                                 value={data.fname}
                                 onChange={handleChange}
                              />
                           </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                           <Form.Label>Last Name</Form.Label>
                           <InputGroup hasValidation>
                              <Form.Control
                                 name="name"
                                 value={data.lname}
                                 onChange={handleChange}
                              />
                           </InputGroup>
                        </Form.Group>

                     </Row>
                     <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                           <Form.Label>Email</Form.Label>
                           <Form.Control
                              name="email"
                              value={data.email}
                              onChange={handleChange}
                           />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                           <Form.Label>Password</Form.Label>
                           <InputGroup hasValidation>
                              <Form.Control
                                 name="password"
                                 value={data.password}
                                 onChange={handleChange}
                                 type="password"
                              />
                           </InputGroup>
                        </Form.Group>
                     </Row>
                     <Row className="d-flex flex-column align-items-center my-5">
                        <Form.Group as={Col} md="12">
                           <Form.Label>Your BMI</Form.Label>
                           <InputGroup hasValidation>
                              <Form.Control
                                 // margin="normal"
                                 // fullWidth
                                 name="bmi"
                                 value={data.bmi}
                                 onChange={handleChange}
                                 // label="Enter your bmi"
                                 type="text"
                              // id="bmi"
                              />
                           </InputGroup>

                        </Form.Group>

                        <Form.Group as={Col} md="6">
                           <Dropdown className='my-2 mx-4'>
                              <Dropdown.Toggle variant="contained-primary" id="dropdown-basic">
                                 {selectedOption}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                 <Dropdown.Item onClick={() => handleSelect("Customer")}>Customer</Dropdown.Item>
                                 <Dropdown.Item onClick={() => handleSelect("Trainer")}>Trainer</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </Form.Group>
                     </Row>
                     <div className="d-flex flex-column align-items-center my-5">
                        <Button variant='contained' size="large" type='submit'
                        // startIcon={<AddIcon />}
                        >
                           Sign Up
                        </Button>
                        <span>Have an account?<Link style={{ color: "#090987" }} to={'/login'} variant="body2">
                           Sign In
                        </Link></span>
                     </div>
                  </Form>
               </Box>
            </Container>
         </div>
      </div>
   )
}

export default Register
