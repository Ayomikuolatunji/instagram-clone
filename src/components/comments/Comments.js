import React from "react";
import Avatar from "@material-ui/core/Avatar"

export default function comments({username,text,imageUrl}){


    return(
        <div>
             <div className="post_header">
               <Avatar 
                className="post_avatar"
                alt={username}
                src="/static/images/avatar/1.jpg" 
                />
               <h3>{username}</h3>
             </div>
            <h1>{username}</h1>
            <h2>{text}</h2>
        </div>
    )
}