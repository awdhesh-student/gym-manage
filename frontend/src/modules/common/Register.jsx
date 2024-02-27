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
import { Container, Dropdown } from 'react-bootstrap';
import axiosInstance from "./AxiosInstance"
const Register = () => {
   const navigate = useNavigate()

   const [selectedOption, setSelectedOption] = useState('Select User');
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      type: "",
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
      if (!data?.name || !data?.email || !data?.password) return alert("Please fill all fields");
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
                     //border: '1px solid lightblue',
                     borderRadius: '5px'
                  }}
               >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign up
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{
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
                  </Box>
               </Box>
            </Container>
         </div>
      </div>
   )
}

export default Register
