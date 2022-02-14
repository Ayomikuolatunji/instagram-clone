import React from "react";
import Signup from "../auth/Signup";
import Logout  from "../auth/Logout";
import Login from '../auth/Login';
import {FireBaseApi} from "../contextApi/ContextApi";
import Upload from '../upload/Upload';




export default function Header(){
   const {user} =React.useContext(FireBaseApi)
   return (
    <div className="app_header">
        <div className="flex justify-between sm:w-4/5 mx-auto">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="img" className='app_header_img'/>
            
            <div className="flex">
            <Upload/>
            <button className="mx-2"><i class="fab fa-facebook-messenger text-xl"></i></button>
            {
               user ? <Logout/> :(
                  <div>
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