import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import {FireBaseApi} from "../contextApi/ContextApi"


export default function Signup() {
    const [open,setOpen]=React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {signUpcontext} =React.useContext(FireBaseApi)
    const [email,setEmail]=React.useState("");
    const [name,setName]=React.useState("");
    const [password,setPassword]=React.useState("");

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
 
     
    const signUp=(e)=>{
       e.preventDefault()
       signUpcontext(email,password,name)
    }


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
             placeholder="username"
             type="text"
             value={name}
             onChange={(e)=>setName(e.target.value)}
             className="block"
           />
           <Input 
             placeholder="email"
             type="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
           />
           <Input 
             placeholder="setPassword"
             type="password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
           />
           <Button onClick={signUp}>Signup</Button>
          </form>
         </Box>
      </Modal>
      <Button onClick={handleOpen}>Sign up</Button>
  </div>;
}
