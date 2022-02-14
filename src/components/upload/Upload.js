import React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import {FireBaseApi} from "../contextApi/ContextApi";
import { addDoc, collection,getFirestore } from "firebase/firestore";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LinearWithValueLabel from "../utility/Utility";
import {GrAddCircle} from "react-icons/all";
import uploadimg from "../../cloud-upload-outline.png"


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
      border: '1px solid gray',
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
            if(docRef.id){
              postsData()
              handleClose()
            }
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
      <Box sx={style} className="rounded-xl">
           <div className="absolute top-0 right-0 left-0 text-center p-3 border-b-2 border-gray-300">
               <h1 className='text-gray-600 font-extrabold'>Create new post</h1>
             </div>
            <form action="" className='flex flex-col relative mt-5'>
             <div className='w-full mt-4'>
              <Input 
              placeholder="Enter post caption"
              type="caption"
              value={caption}
              onChange={(e)=>setcaption(e.target.value)}
              className="border-1 w-full text-center p-3"
              />
            </div>
             <span>{progress ? <LinearWithValueLabel progress={progress}/> : ""}</span>
             <div className='w-full mt-5'>
               <label htmlFor="file"  className='block  p-3 text-center rounded-md w-1/2 mx-auto relative'>
                  <img src={uploadimg} alt="" />
                  <span className='absolute top-1/5 right-1/3 text-black font-extrabold'>{file.name}</span>
                  <input 
                    placeholder="setPassword"
                    type="file"
                    onChange={(e)=>handleFile(e)}
                    className="border-1 w-full text-center mt-4 hidden"
                    id='file'
                  />
               </label>
             </div>
             <div className='w-full mt-5'>
             <button onClick={handleUpload} className='block bg-purple-500 p-3 text-center rounded-md mx-auto text-gray-800 font-extrabold'>
                Upload post
              </button>
             </div>
      </form>
      </Box>

  </Modal>
  <Button onClick={handleOpen}><GrAddCircle className='text-2xl'/></Button>
     
  </div>;
}
