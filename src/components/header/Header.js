import React from "react";
import Signup from "../auth/Signup";
import Logout  from "../auth/Logout";
import Login from '../auth/Login';
import {FireBaseApi} from "../contextApi/ContextApi";
import Upload from '../upload/Upload';



export default function Header(){
   const {user} =React.useContext(FireBaseApi)
   return (
    <div className="app_header flex justify-between">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="img" className='app_header_img'/>
        <Upload/>
        {
           user ? <Logout/> :(
              <div className="flex">
                 <Signup/>
                 <Login/>
              </div>
           )
        }
  </div>
   )
}