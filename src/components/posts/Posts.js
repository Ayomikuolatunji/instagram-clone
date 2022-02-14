import React from 'react';
import {FireBaseApi} from "../contextApi/ContextApi";
import Post from "./Post";
import InstagramEmbed from 'react-instagram-embed';

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
   <InstagramEmbed
      url='https://www.instagram.com/p/CZkCSjKtJK0/'
      clientAccessToken='1055217855044724|aa430844f8cbd5df363666715e001ce8'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
    />
   </div>

  </div>;
}
