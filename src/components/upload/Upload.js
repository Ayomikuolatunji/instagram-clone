import React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import {FireBaseApi} from "../contextApi/ContextApi";
import { addDoc, collection,getFirestore } from "firebase/firestore";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LinearWithValueLabel from "../utility/Utility"


const db = getFirestore();
export default function Upload() {
  const [open,setOpen]=React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const {
        storage,
        ref, 
        uploadBytesResumable, 
        getDownloadURL,
        postsData
     }=React.useContext(FireBaseApi)
    const [caption,setcaption]=React.useState("")
    const [file,setfile]=React.useState('')
    const [progress,setProgress]=React.useState("")
    const handleFile=(e)=>{
      setfile(e.target.files[0])
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
    const username=localStorage.getItem("username")

    const uploadDb=async(url,captionText)=>{
        try {
            const docRef = await addDoc(collection(db, "posts"), {
              username: username,
              imageUrl:url,
              caption: captionText,
            });
            postsData()
            setOpen(false)
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    
    const handleUpload=()=>{
        if(caption ==="" || file===""){
            console.log("select file")
            return
        }
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
        (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        default :
         console.log("none")
        }
    
    }, 
    (error) => {
        console.log(error.message)
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
         uploadDb(downloadURL,caption)
        });
     }
   );
    }


  return <div>
    <Modal
     open={open}
     onClose={handleClose}
    >
      <Box sx={style}>
      <form action="" className='flex flex-col'>
        <Input 
             placeholder="enter post caption"
             type="caption"
             value={caption}
             onChange={(e)=>setcaption(e.target.value)}
           />
           {progress ? <LinearWithValueLabel progress={progress}/> : ""}
           <Input 
             placeholder="setPassword"
             type="file"
             onChange={(e)=>handleFile(e)}
             className="w-1/2"
           />
           <Button onClick={handleUpload}>
               Upload post
           </Button>
      </form>
      </Box>

  </Modal>
  <Button onClick={handleOpen}>Add post</Button>
     
  </div>;
}
