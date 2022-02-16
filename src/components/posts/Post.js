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
    const [comments,setcomments]=React.useState([]);
    const [more,setmore]=React.useState(1)
    const  [comment,setcomment]=React.useState("");
    const {postsData}=React.useContext(FireBaseApi);
 
      // get all comment using posts id
      const fetchComments=async(postid)=>{
        const query =collection(db,"posts",postid,"comments")
        const res=await getDocs(query)
        setcomments(res.docs.map(doc=>doc.data()))
      }
   
     useEffect(()=>{
       fetchComments(id)
     },[id]);


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
          fetchComments(id)
          setcomment("")
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
            <div>
              {comments.length>0 ? comments.slice(0,more).reverse().map((comment,index)=>{
                return <div key={index}>
                    <Comments {...comment} imageUrl={imageUrl}/>
                </div>
              }):null}
            </div>
            <div className="flex justify-between p-4">
            <h3 onClick={()=>setmore(more+2)} className={`${(comments.length)-( comments.slice(0,more).length)===0?"hidden":"cursor-pointer"}`}>view all {(comments.length)-( comments.slice(0,more).length)} comments</h3>
            <h3 onClick={()=>setmore(more-2)} className={`${(comments.length)-( comments.slice(0,more).length)===0?"hidden":"cursor-pointer"}`}>hide comments</h3>
            </div>
            <Comment setcomment={setcomment} postComments={postComments} comment={comment}/>
        </div>
    )
}