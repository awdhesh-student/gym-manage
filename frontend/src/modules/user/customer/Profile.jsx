import React, { useState, useContext } from 'react';
import { Container, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import { message } from 'antd';
import axiosInstance from '../../common/AxiosInstance';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { UserContext } from '../../../App';

const Profile = () => {
   const user = useContext(UserContext)
   const [itemsDetails, setItemDetails] = useState({})
   const handleChange = () => { }
   const handleSubmit = () => { }
   const handleDocumentChange = () => { }
   return (
      <Container>
         <div className="d-flex justify-content-center">
            <h1 className='mb-4'>Add Items</h1>
         </div>
         <Form style={{ padding: '50px' }} onSubmit={handleSubmit}>
            <Row className="mb-3">
               <Form.Group as={Col} md="4">
                  <Form.Group as={Col}>
                     <Form.Label>Item type</Form.Label>
                     <Form.Select name='itemType' value={itemsDetails.itemType} onChange={handleChange}>
                        <option>Select Type</option>
                        <option>House hold</option>
                        <option>Auto Mobiles</option>
                        <option>Accessories</option>
                     </Form.Select>
                  </Form.Group>
               </Form.Group>

               <Form.Group as={Col} md="4">
                  <Form.Label>Item Title</Form.Label>
                  <InputGroup hasValidation>
                     <Form.Control
                        type="text"
                        placeholder="title"
                        aria-describedby="inputGroupPrepend"
                        required
                        name='itemTitle'
                        value={itemsDetails.itemTitle}
                        onChange={handleChange}
                     />
                  </InputGroup>
               </Form.Group>

               <Form.Group as={Col} md="4">
                  <Form.Group as={Col}>
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
               </Form.Group>

            </Row>
            <Row className="mb-3">
               <Form.Group as={Col} md="4">
                  <Form.Label>Property Images</Form.Label>
                  <Form.Control name='photo' accept='images/*' type="file" onChange={handleDocumentChange} id='photo' />
               </Form.Group>
               <Form.Group as={Col} md="4">
                  <Form.Label>Item Amt.(Rs.per hrs)</Form.Label>
                  <Form.Control type="number" placeholder="amount" required
                     name='itemAmt'
                     value={itemsDetails.itemAmt}
                     onChange={handleChange}
                  />
               </Form.Group>
               <Form.Group as={Col} md="4">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="quantity"
                     required
                     name='quantity'
                     value={itemsDetails.quantity}
                     onChange={handleChange}
                  />
               </Form.Group>
               <Form.Group as={Col} md="4">
                  <Form.Label>Item Location</Form.Label>
                  <Form.Control type="text" placeholder="location" required
                     name='itemLoc'
                     value={itemsDetails.itemLoc}
                     onChange={handleChange}
                  />
               </Form.Group>
               <FloatingLabel
                  label="Additional details for the Item"
                  className="mt-4"
               >
                  <Form.Control name='additionalInfo' value={itemsDetails.additionalInfo} onChange={handleChange} as="textarea" placeholder="Leave a comment here" />
               </FloatingLabel>
            </Row>
            <div className="d-flex justify-content-center my-5">
               <Button variant='contained' size="large" type='submit' startIcon={<AddIcon />}>
                  Add Item
               </Button>
            </div>
         </Form>
      </Container>
   )
}

export default Profile
