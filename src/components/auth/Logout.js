import React from "react";
import Button from '@mui/material/Button';
import {FireBaseApi} from "../contextApi/ContextApi"

export default function Logout(){
    const {auth} =React.useContext(FireBaseApi)
   

    const logoutBtn=()=>auth.signOut()
    return(
        <Button onClick={()=>{
            logoutBtn()
            localStorage.removeItem("username")
            }}>
           Logout
        </Button>
    )
}