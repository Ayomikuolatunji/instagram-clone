import React from "react";
import Button from '@mui/material/Button';
import {FireBaseApi} from "../contextApi/ContextApi";
import {FiLogOut} from "react-icons/all"

export default function Logout(){
    const {auth} =React.useContext(FireBaseApi)

   

    const logoutBtn=()=>auth.signOut()
    return(
        <Button onClick={()=>{
            logoutBtn()
            localStorage.removeItem("username")
            }}>
           <FiLogOut className="text-3xl"/>
        </Button>
    )
}