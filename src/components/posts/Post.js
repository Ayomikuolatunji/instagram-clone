import React,{useEffect} from  "react";
import "./posts.css";
import Avatar from "@material-ui/core/Avatar"
import { collection, getDocs } from "firebase/firestore";  
import { getFirestore } from "firebase/firestore";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


const db = getFirestore();
export default function Post({username,caption, imageUrl,id}){
    const [comments,setcomments]=React.useState(false)
    const  [comment,setcomment]=React.useState("")

     useEffect(()=>{
        const postsData=async()=>{
          const query =collection(db,"posts",id,"comments")
          const res=await getDocs(query)
          res.docs.map(doc=>{
            return setcomments(doc.data())
          })
         }
       postsData()
     },[id]);
     console.log(comments.text)

     const postComments=async()=>{
       
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
            <form action="">
            <Input 
             placeholder="add a comment"
             type="caption"
             value={comment}
             onChange={(e)=>setcomment(e.target.value)}
            />
              <Button >
               Upload post
           </Button>
            </form>
        </div>
    )
}