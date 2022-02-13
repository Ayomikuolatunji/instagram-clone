import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import {FireBaseApi} from "../contextApi/ContextApi"

export default function Login() {
    const [open,setOpen]=React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");
    const {loginContext} =React.useContext(FireBaseApi)
    const signIn=(e)=>{
        e.preventDefault()
        loginContext(email,password)
     }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  return <div>
  <Modal
     open={open}
     onClose={handleClose}
  >
  <Box sx={style}>
   <center>
   <img 
   src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
   alt="img" 
   className='app_header_img'/>
   </center>
   <form action="" className="flex flex-col">
    <Input 
      placeholder="email"
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
    />
    <Input 
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
    />
    <Button onClick={signIn}>Login</Button>
   </form>
  </Box>
</Modal>
<Button onClick={handleOpen}>Login</Button>
</div>;
}
