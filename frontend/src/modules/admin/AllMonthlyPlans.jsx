import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Spinner, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../common/AxiosInstance';
import { message } from 'antd';
import { UserContext } from "../../App"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const AllMonthlyPlans = () => {
   const user = useContext(UserContext)

   const [filterItemType, setItemType] = useState('');
   const [items, setItems] = useState([]);
   const [show, setShow] = useState(false);
   const [updateItem, setUpdateItem] = useState({
      itemBrand: "",
      quantity: "",
   });
   const [selectedItem, setSelectedItem] = useState(null);

   const handleChange = (e) => {
      setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
   }
   const handleClose = () => {
      setShow(false)
      setSelectedItem(null)
   };
   const handleShow = () => setShow(true);
   const allItems = async () => {
      try {
         const res = await axiosInstance.get('/api/admin/getallitems');
         setItems(res.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   // useEffect(() => {
   //    allItems();
   // }, []);

   const filteredItems = items
      .filter(
         (item) =>
            filterItemType === '' ||
            item.itemType.toLowerCase().includes(filterItemType.toLowerCase())
      )

   const updatedItem = (i) => {
      setSelectedItem(i)
      setUpdateItem({
         ...updateItem,
         itemBrand: i.itemBrand,
         quantity: i.quantity,
         itemAmt: i.itemAmt,
      })
      handleShow()
   }

   const handleSaveChanges = async () => {
      try {
         const res = await axiosInstance.put(`/api/admin/inventory/${selectedItem._id}`, updateItem, {
            headers: {
               'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
         });

         if (res.data.success) {
            message.success(res.data.message)
            allItems();
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
         const res = await axiosInstance.delete(`/api/admin/item/${id}`, {
            headers: {
               'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
         })

         if (res.data.success) {
            message.success(res.data.message)
            allItems();
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
         {/* <h1 className='my-5 text-center text-light'>All Monthly Plans</h1> */}
         <div className=" mt-4 filter-container text-center">
            <p className="mt-3">Filter By: </p>
            <select value={filterItemType} onChange={(e) => setItemType(e.target.value)}>
               <option>Select Type</option>
               <option>Treadmils</option>
               <option>Ellipticals</option>
               <option>Stationary bikes</option>
               <option>weight machines</option>
               <option>cable machines</option>
               <option>dumbbells</option>
               <option>barbells</option>
               <option>exercise mats</option>
               <option>resistance bands</option>
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
            </Card>
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
            </Card>
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
            </Card>
            
            {/* {filteredItems && filteredItems.length > 0 ? (
               filteredItems.map((item) => (
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
                                             <Form.Label>Item Title</Form.Label>
                                             <Form.Control
                                                type="text"
                                                autoFocus
                                                name='itemBrand'
                                                value={updateItem.itemBrand}
                                                onChange={handleChange}
                                             />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                             <Form.Label>Item Quantity</Form.Label>
                                             <Form.Control
                                                type="text"
                                                autoFocus
                                                name='quantity'
                                                value={updateItem.quantity}
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

export default AllMonthlyPlans;
