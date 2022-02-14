import React from "react";
import Signup from "../auth/Signup";
import Logout  from "../auth/Logout";
import Login from '../auth/Login';
import {FireBaseApi} from "../contextApi/ContextApi";
import Upload from '../upload/Upload';
import {FaHome,GiEternalLove} from "react-icons/all"




export default function Header(){
   const {user} =React.useContext(FireBaseApi)
   return (
    <div className="app_header">
        <div className="flex justify-between sm:w-9/12  mx-auto w-full">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="img" className='app_header_img w-28'/>
            
            <div className="flex items-center">
            <FaHome className="text-3xl"/>
            {user && <button className="ml-5"><i class="fab fa-facebook-messenger text-2xl"></i></button>}
            {user && <Upload/>}
            {user && <GiEternalLove className="text-3xl"/>}
            {
               user ? <Logout/> :(
                  <div className="flex items-center">
                     <Signup/>
                     <Login/>
                  </div>
               )
            }
         </div>
        </div>
  </div>
   )
}