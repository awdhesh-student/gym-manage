import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Spinner, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../common/AxiosInstance';
import { message } from 'antd';
// import { UserContext } from "../../App"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const AllWorkoutPlans = () => {
   // const user = useContext(UserContext)

   const [filterItemTarget, setItemTarget] = useState('');
   const [workoutPlans, setWorkoutPlans] = useState([]);
   const [show, setShow] = useState(false);
   const [updateWorkout, setUpdateWorkout] = useState({
      muscleTargeted: 'Choose...',
      workoutTitle: '',
      workoutPrice: "",
      duration: ""
   });
   const [selectedItem, setSelectedItem] = useState(null);

   const handleChange = (e) => {
      setUpdateWorkout({ ...updateWorkout, [e.target.name]: e.target.value });
   }
   const handleClose = () => {
      setShow(false)
      setSelectedItem(null)
   };
   const handleShow = () => setShow(true);
   const allWorkouts = async () => {
      try {
         const res = await axiosInstance.get('/api/user/trainer/getallworkout');
         setWorkoutPlans(res.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   // useEffect(() => {
   //    allWorkouts();
   // }, []);

   const filteredPlans = workoutPlans
      .filter(
         (item) =>
            filterItemTarget === '' ||
            item.itemType.toLowerCase().includes(filterItemTarget.toLowerCase())
      )

   const updatedItem = (i) => {
      setSelectedItem(i)
      setUpdateWorkout({
         ...updateWorkout,
         muscleTargeted: i.muscleTargeted,
         workoutTitle: i.workoutTitle,
         workoutPrice: i.workoutPrice,
         duration: i.duration
      })
      handleShow()
   }

   const handleSaveChanges = async () => {
      try {
         const res = await axiosInstance.put(`/api/user/trainer/inventory/${selectedItem._id}`, updateWorkout, {
            headers: {
               'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
         });

         if (res.data.success) {
            message.success(res.data.message)
            allWorkouts();
         }
         else {
            message.warning(res.data.message)
         }
      } catch (error) {
         console.log(error.message);
      }

      handleClose();
   };

   const deleteItem = async (id) => {
      const sure = confirm("Are you sure to delete this item?");
      if (!sure) return;
      try {
         const res = await axiosInstance.delete(`/api/user/trainer/item/${id}`, {
            headers: {
               'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
         })

         if (res.data.success) {
            message.success(res.data.message)
            allWorkouts();
         }
         else {
            message.error(res.data.message)
         }
      } catch (error) {
         console.log(error.message)
      }
   }

   return (
      <Container>
         <h1 className='my-5 text-center text-white'>All Workout Plans</h1>
         <div className=" mt-4 filter-container text-center">
            <p className="mt-3">Filter By: </p>
            <select value={filterItemTarget} onChange={(e) => setItemTarget(e.target.value)}>
               <option>Select Target</option>
               <option>Calf</option>
               <option>Shoulders</option>
               <option>Chest</option>
               <option>Others</option>
            </select>
         </div>
         <div className="all-items mt-5">
         
            <Card sx={{ maxWidth: 345 }}>
               <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
               />
               <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                     Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     Lizards are a widespread group of squamate reptiles, with over 6,000
                     species, ranging across all continents except Antarctica
                  </Typography>
               </CardContent>
               <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
               </CardActions>
            </Card><Card sx={{ maxWidth: 345 }}>
               <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
               />
               <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                     Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     Lizards are a widespread group of squamate reptiles, with over 6,000
                     species, ranging across all continents except Antarctica
                  </Typography>
               </CardContent>
               <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
               </CardActions>
            </Card>
            {/* {filteredPlans && filteredPlans.length > 0 ? (
               filteredPlans.map((item) => (
                  <Card key={item._id} sx={{ maxWidth: 300 }}>
                     <CardMedia
                        component="img"
                        height='140'
                        src={`http://localhost:8002${item.photo.path}`}
                        alt={item.photo.filename}
                     />
                     <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                           {item.itemType}
                        </Typography>
                        <Typography className='d-flex flex-wrap justify-content-between' variant="body2" color="text.secondary" margin={'15px auto'}>
                           <ul className=''>
                              <li><b>Item Type:&nbsp;</b> {item.itemType}</li>
                              <li><b>Item Brand:&nbsp;</b> {item.itemBrand}</li>
                           </ul>
                           <hr style={{ width: "100%" }} />
                           <ul className=''>
                              <li><b>Item Quantity:&nbsp;</b> {item.quantity}</li>
                           </ul>
                        </Typography>
                     </CardContent>
                     <CardActions className='d-flex w-100 justify-content-between'>
                        {
                           user.userData.type === "admin" ?
                              <>
                                 <Button variant='outlined' size="small" startIcon={<UpdateIcon />} onClick={() => updatedItem(item)}>
                                    Update
                                 </Button>
                                 <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Item #:{selectedItem?._id}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                       <Form>
                                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                             <Form.Label>Workout Title</Form.Label>
                                             <Form.Control
                                                type="text"
                                                autoFocus
                                                name='workoutTitle'
                                                value={updateWorkout.workoutTitle}
                                                onChange={handleChange}
                                             />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                             <Form.Label>Target Muscle</Form.Label>
                                             <Form.Select name='muscleTargeted' value={updateWorkout.muscleTargeted} onChange={handleChange}>
                                                <option value="">Choose...</option>
                                                <option>Calf</option>
                                                <option>Shoulders</option>
                                                <option>Chest</option>
                                             </Form.Select>
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                             <Form.Label>Workout Duration</Form.Label>
                                             <Form.Select name='duration' value={updateWorkout.duration} onChange={handleChange}>
                                                <option value="">Choose...</option>
                                                <option>3 weeks</option>
                                                <option>4 weeks</option>
                                                <option>5 weeks</option>
                                             </Form.Select>
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                             <Form.Label>Workout Price</Form.Label>
                                             <Form.Control
                                                type="number"
                                                autoFocus
                                                name='workoutPrice'
                                                value={updateWorkout.workoutPrice}
                                                onChange={handleChange}
                                             />
                                          </Form.Group>
                                       </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="secondary" onClick={handleClose}>
                                          Close
                                       </Button>
                                       <Button variant="primary" onClick={handleSaveChanges}>
                                          Save Changes
                                       </Button>
                                    </Modal.Footer>
                                 </Modal>
                                 <Button variant='outlined' size="small" startIcon={<DeleteIcon />} onClick={() => deleteItem(item._id)}>
                                    Delete
                                 </Button>
                              </>
                              : null
                        }
                     </CardActions>


                  </Card>

               ))
            ) : (
               // <div className="spinner-container">
               //    {Array.from({ length: 7 }, (_, i) => (
               //       <Spinner key={i} animation="grow" variant="outline-info" />
               //    ))}
               // </div>
               <p>NO    </p>
            )} */}
         </div>
      </Container>
   );
};

export default AllWorkoutPlans;