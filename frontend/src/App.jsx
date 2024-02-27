import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import { createContext, useEffect, useState } from "react";
// import UserHome from "./modules/user/UserHome";
import AdminHome from "./modules/admin/AdminHome";
import CustomerHome from "./modules/user/customer/CustomerHome";
import TrainerHome from "./modules/user/trainer/TrainerHome";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user && user !== undefined) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider
    //value={{ userData, userLoggedIn }}
    >
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/customerhome" element={<CustomerHome />} />
              <Route path="/trainerhome" element={<TrainerHome />} />
              {/* <Route path="/userhome" element={<UserHome />} /> */}
              {/* {userLoggedIn ? (
                <>
                  <Route path="/adminhome" element={<AdminHome />} />
                  <Route path="/userhome" element={<UserHome />} />
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )} */}
            </Routes>
          </div>
          <footer className="bg-light text-center text-lg-start">
            <div className="text-center text-dark p-3">© {date} Copyright: GymPro</div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;



