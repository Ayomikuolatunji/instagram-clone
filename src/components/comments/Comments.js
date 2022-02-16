import React from "react"


export default function comments({username,text}){
    


    return(
        <div>
             <div className="post_header  flex">
             </div>
            <h1><span className="text-gray-800 font-extrabold mr-3">{username}</span> {text}</h1>
        </div>
    )
}