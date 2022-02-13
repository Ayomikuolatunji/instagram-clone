import React from 'react';
import "./App.css";
import Header from "./components/header/Header";
import Posts from "./components/posts/Posts";





export default function App() {
   
         
  return(
    <div className='app'>
    {/* header componens */}
    <Header/>
    {/* Posts components */}
    <Posts/>
    
   </div>
  )


}
