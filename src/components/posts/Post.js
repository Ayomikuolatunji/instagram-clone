import React,{useEffect} from  "react";
import "./posts.css";
import Avatar from "@material-ui/core/Avatar"
import { collection, getDocs,addDoc,getFirestore } from "firebase/firestore";  
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {FireBaseApi} from "../contextApi/ContextApi";


const db = getFirestore();
export default function Post({username,caption, imageUrl,id}){
    const [comments,setcomments]=React.useState(false);
    const  [comment,setcomment]=React.useState("");
    const {postsData}=React.useContext(FireBaseApi)

     useEffect(()=>{
        const postsData=async()=>{
          const query =collection(db,"posts",id,"comments")
          const res=await getDocs(query)
          setcomments(res.docs.map(doc=>doc.data()))
         }
       postsData()
     },[id]);
     const postComments=async(e)=>{
      if(!comment){
        console.log("error")
        return;
      }
      try {
        const docRef = await addDoc(collection(db,"posts",id,"comments"), {
          username: username,
          text:comment,
        });
        if(docRef.id){
          postsData()
        }
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
     }
    return(
        <div  className="posts">
             {/* header avatar--->*/}
             <div className="post_header">
               <Avatar 
                className="post_avatar"
                alt={username}
                src="/static/images/avatar/1.jpg" 
                />
               <h3>{username}</h3>
             </div>
            {/* image */}
               <img src={imageUrl}  alt="image_tag" className="post_img"/>
            {/* userame + caption */}
            <h4 className="post_text"><strong>{username}</strong>{caption}</h4>
            <div className="border-2">
              {comments ? comments.map((comment,index)=>{
                return <div key={index}>
                    <h1>{comment.username}</h1>
                   <h2>{comment.text}</h2>
                </div>
              }):null}
            </div>
            <form action="">
            <Input 
             placeholder="add a comment"
             type="caption"
             value={comment}
             onChange={(e)=>setcomment(e.target.value)}
            />
              <Button onClick={postComments}>
               Upload post
              </Button>
            </form>
        </div>
    )
}