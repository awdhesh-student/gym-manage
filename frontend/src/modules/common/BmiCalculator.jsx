import React, { useState, forwardRef } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const BmiCalculator = () => {
   const [values, setValues] = useState({
      feet: '',
      inches: '',
      weight: '',
      bmi: null,
      error: ''
   });

   const [open, setOpen] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setValues((prevVals) => ({ ...prevVals, [name]: value }));
   };

   const calBMI = (ft, inch, w) => {
      const feet = parseInt(ft);
      const inches = parseInt(inch);
      const weight = parseFloat(w);

      if (isNaN(feet) || isNaN(inches) || isNaN(weight) || feet <= 0 || inches < 0 || inches >= 12 || weight <= 0) {
         setValues((prevVals) => ({
            ...prevVals,
            bmi: null,
            error: "Please enter valid height and weight."
         }));
         return;
      }

      const totalInches = feet * 12 + inches;
      const heightMeters = totalInches * 0.0254;
      const bmi = Math.round(weight / (Math.pow(heightMeters, 2)));
      setValues((prevVals) => ({ ...prevVals, bmi, error: '' }));
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <Form style={{ padding: '25px' }} onSubmit={(e) => { e.preventDefault(); calBMI(values.feet, values.inches, values.weight); }}>
         <Row className="mb-3">
            
            <Form.Group as={Col} md="4">
               <Form.Label>Height (Feet)</Form.Label>
               <InputGroup hasValidation>
                  <Form.Control
                     type="number"
                     placeholder="Feet"
                     aria-describedby="inputGroupPrepend"
                     required
                     name='feet'
                     value={values.feet}
                     onChange={handleChange}
                  />
               </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4">
               <Form.Label>Height (Inches)</Form.Label>
               <InputGroup hasValidation>
                  <Form.Control
                     type="number"
                     placeholder="Inches"
                     aria-describedby="inputGroupPrepend"
                     required
                     name='inches'
                     value={values.inches}
                     onChange={handleChange}
                  />
               </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4">
               <Form.Label>Weight (in kg)</Form.Label>
               <InputGroup hasValidation>
                  <Form.Control
                     type="number"
                     placeholder="Enter weight"
                     required
                     name='weight'
                     value={values.weight}
                     onChange={handleChange}
                  />
               </InputGroup>
            </Form.Group>
         </Row>
         <div className="d-flex justify-content-center my-5">
            <Button variant='contained' size="large" type='submit'>
               Calculate BMI
            </Button>
         </div>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  {values.bmi !== null ? <h2>Your BMI is: {values.bmi}</h2> : values.error}
                  
                  <h6>BMI Categories:</h6>
                  <ul>
                     <li style={{color: 'black', fontSize: 10}}>Underweight = less than 18.5</li>
                     <li style={{color: 'black', fontSize: 10}}>Normal weight = 18.5–24.9</li>
                     <li style={{color: 'black', fontSize: 10}}>Overweight = 25–29.9</li>
                     <li style={{color: 'black', fontSize: 10}}>Obesity = BMI of 30 or greater</li>
                  </ul>
               </DialogContentText>

            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Close
               </Button>
            </DialogActions>
         </Dialog>
      </Form>
   );
};

export default BmiCalculator;
