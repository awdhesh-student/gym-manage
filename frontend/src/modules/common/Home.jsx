import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar';
import { Button, Carousel } from 'react-bootstrap';
import p1 from "../../images/p1.jpg"
import p2 from "../../images/p2.jpg"
import p3 from "../../images/p3.jpg"
import AllItems from '../admin/AllItems';
import AllWorkoutPlans from '../user/trainer/AllWorkoutPlans';
import AllMonthlyPlans from '../admin/AllMonthlyPlans';
import BmiCalculator from './BmiCalculator';

const Home = () => {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };
   return (
      <div>
         <NavBar />
         <div className="first-container">
            <div className='home-body'>
               <Carousel activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item>
                     <img
                        src={p1}
                        alt="First slide"
                     />
                  </Carousel.Item>
                  <Carousel.Item>
                     <img
                        src={p2}
                        alt="Second slide"
                     />
                  </Carousel.Item>
                  <Carousel.Item>
                     <img
                        src={p3}
                        alt="Third slide"
                     />
                  </Carousel.Item>
               </Carousel>
            </div>
            <div className="content-home">
               <h1>Welcome to GYM Pro!</h1>
               <p>Transform Your Body, Elevate Your Mind</p>
               <Link to={'/login'}><Button variant='warning' className='m-2' size='md'>Learn More!</Button></Link>
            </div>
         </div>
         <div className='second-container'>
            <div>
               <h1 className='m-3 text-center text-light'>All Workout Plans that may you looking for</h1>
               <AllWorkoutPlans />


            </div>
         </div>
         <div className='second-container'>
            <div>
               <h1 className='m-3 text-center text-light'>All Monthly Plans that may you looking for</h1>
               <AllMonthlyPlans />
            </div>
         </div>
         <div className='second-container'>
            <div>
               <h1 className='m-3 text-center text-light'>All Equipments that may you looking for</h1>
               <AllItems />
            </div>
         </div>
         <div className='second-container'>
            <div>
               <h1 className='m-3 text-center text-light'>Check Your BMI</h1>
               <BmiCalculator />
            </div>
         </div>
      </div>
   )
}

export default Home
