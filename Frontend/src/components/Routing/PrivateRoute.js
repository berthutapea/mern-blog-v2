// import { useEffect,useState,useContext } from 'react';
// import {Outlet, useNavigate} from 'react-router-dom'
// import Home from '../GeneralScreens/Home';
// import axios from 'axios';
// import { AuthContext } from "../../Context/AuthContext";

// const PrivateRoute =( ) => {
//     const bool =localStorage.getItem("authToken") ? true :false
//     const [auth ,setAuth] =useState(bool)
//     const [error ,setError] =useState("")
//     const navigate = useNavigate()
//     const {setActiveUser,setConfig } = useContext(AuthContext)

//     useEffect(() => {

//        const controlAuth = async () => {
//         const config = {
//             headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//         };
//         try {
//             const { data } = await axios.get("/auth/private", config); 

//             setAuth(true)
//             setActiveUser(data.user)
//             setConfig(config)

//         } 
//         catch (error) {

//             localStorage.removeItem("authToken");

//             setAuth(false)
//             setActiveUser({})

//             navigate("/")

//             setError("You are not authorized please login"); 
//         }
//         };

//         controlAuth()
//     }, [bool,navigate])


//     return (auth ? <Outlet />  : <Home error={error} />)
// }

// export default PrivateRoute;
