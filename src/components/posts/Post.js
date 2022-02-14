import React,{useEffect} from  "react";
import "./posts.css";
import Avatar from "@material-ui/core/Avatar"
import { collection, getDocs,addDoc,getFirestore } from "firebase/firestore";  
import {FireBaseApi} from "../contextApi/ContextApi";
import Comments from "../comments/Comments";
import {BsThreeDots} from "react-icons/all"
import Comment from "../comments/Comment";



const db = getFirestore();
export default function Post({username,caption, imageUrl,id}){
    const [comments,setcomments]=React.useState(false);
    const  [comment,setcomment]=React.useState("");
    const {postsData}=React.useContext(FireBaseApi);
     
    // get all comment using posts id
    const fetchComments=async()=>{
      const query =collection(db,"posts",id,"comments")
      const res=await getDocs(query)
      setcomments(res.docs.map(doc=>doc.data()))
     }
     useEffect(()=>{
       fetchComments()
     });
     const postComments=async(e)=>{
      if(!comment){
        console.log("error")
        return;
      }
      try {
        const docRef = await addDoc(collection(db,"posts",id,"comments"), {
          username: localStorage.getItem("username"),
          text:comment,
        });
        if(docRef.id){
          postsData()
          fetchComments()
        }
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
     }
    return(
        <div  className="posts">
             {/* header avatar--->*/}
             <div className="post_header flex justify-between">
               <div className="post_header flex justify-between items-center">
                <Avatar 
                  className="post_avatar"
                  alt={username}
                  src="/static/images/avatar/1.jpg" 
                  />
                <h3>{username}</h3>
               </div>
               <BsThreeDots/>
             </div>
            {/* image */}
               <img src={imageUrl}  alt="image_tag" className="post_img"/>
            {/* userame + caption */}
            <h4 className="post_text"><strong>{username}</strong>{caption}</h4>
            <div className="border-2">
              {comments ? comments.map((comment,index)=>{
                return <div key={index}>
                    <Comments {...comment} imageUrl={imageUrl}/>
                </div>
              }):null}
            </div>
            <Comment setcomment={setcomment} postComments={postComments} comment={comment}/>
        </div>
    )
}