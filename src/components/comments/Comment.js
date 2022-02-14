import React from "react";
import {GrEmoji} from "react-icons/all"



export default function Comment({setcomment,comment,postComments}){

    return(
        <div className="w-full flex items-center p-3">
             <div>
                 <GrEmoji className="text-3xl"/>
             </div>
             <div className="w-full">
                <input
                placeholder="add a comment"
                type="caption"
                value={comment}
                onChange={(e)=>setcomment(e.target.value)}
                className="w-full border-b-0 p-3 hover:border-0 focus:border-0 hover:outline-none focus:outline-none"
                />
             </div>
              <div className="">
                  <span className="text-green-200 cursor-pointer" onClick={postComments}>Post</span>
              </div>
        </div>
    )
}