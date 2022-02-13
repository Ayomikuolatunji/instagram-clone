import React,{useEffect} from  "react";
import "./posts.css";
import Avatar from "@material-ui/core/Avatar"
import { collection, getDocs } from "firebase/firestore";  
import { getFirestore } from "firebase/firestore";


const db = getFirestore();
export default function Post({username,caption, imageUrl,id}){
    const [comment,setcomment]=React.useState(false)

     useEffect(()=>{
    
        const postsData=async()=>{
          const comments =collection(db,"posts",id,"comments")
          const res=await getDocs(comments)
          res.docs.map(doc=>{
            return  setcomment(doc.data())
          })
         }
       postsData()
     },[id]);
     console.log(comment)
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

        </div>
    )
}