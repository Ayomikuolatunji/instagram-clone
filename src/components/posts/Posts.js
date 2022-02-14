import React from 'react';
import {FireBaseApi} from "../contextApi/ContextApi";
import Post from "./Post";
import Rightpost from "../rigthpost/Rightpost"

export default function Posts() {
    const {posts,id} =React.useContext(FireBaseApi)
  return <div className='flex justify-center flex-wrap'>
      <div className='mr-5'>
          {
          posts &&  posts.map((post,index)=>{
          const {username,imageUrl,caption}=post
          return  <Post username={username} imageUrl={imageUrl} caption={caption} key={index} id={id[index]} post={post}/>
          })
        }
      </div>
      <div>
        < Rightpost/>
     </div>

  </div>;
}
