import React, { useState } from 'react';
import { Container, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import { message } from 'antd';
import axiosInstance from '../common/AxiosInstance';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AllItems from './AllItems';

const Items = () => {
   const [itemsDetails, setItemsDetails] = useState({
      itemType: 'choose...',
      itemBrand: "",
      photo: "",
      quantity: 0,
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setItemsDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   const handleDocumentChange = (e) => {
      const file = e.target.files[0];
      setItemsDetails({ ...itemsDetails, photo: file });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('itemType', itemsDetails.itemType);
      formData.append('itemBrand', itemsDetails.itemBrand);
      formData.append('photo', itemsDetails.photo)
      formData.append('quantity', itemsDetails.quantity)

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
               <h1 className='text-center text-light'>Add Equipments</h1>
            </div>
            <div className="left">
               <Form
                  style={{ padding: '25px' }}
                  onSubmit={handleSubmit}>
                  <Row className="mb-3">
                     <Form.Group as={Col} md="6">
                        <Form.Label>Item type</Form.Label>
                        <Form.Select name='itemType' value={itemsDetails.itemType} onChange={handleChange}>
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
                        </Form.Select>
                     </Form.Group>

                     <Form.Group as={Col} md="6">
                        <Form.Label>Item Brand/Manufacture</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="text"
                              placeholder="Brand/Manufacture"
                              aria-describedby="inputGroupPrepend"
                              required
                              name='itemBrand'
                              value={itemsDetails.itemBrand}
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
                        <Form.Label>Quantity</Form.Label>
                        <InputGroup hasValidation>
                           <Form.Control
                              type="number"
                              placeholder="quantity"
                              required
                              name='quantity'
                              value={itemsDetails.quantity}
                              onChange={handleChange}
                           />
                        </InputGroup>
                     </Form.Group>
                  </Row>
                  <div className="d-flex justify-content-center my-5">
                     <Button variant='contained' size="large" type='submit' startIcon={<AddIcon />}>
                        Add Item
                     </Button>
                  </div>
               </Form>
            </div>
         </div>

         <AllItems />
      </Container>
   )
}

export default Items
