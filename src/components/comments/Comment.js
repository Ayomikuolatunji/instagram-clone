import React from "react";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


export default function Comment({setcomment,comment,postComments}){

    return(
        <div>
             <div>
                <Input 
                placeholder="add a comment"
                type="caption"
                value={comment}
                onChange={(e)=>setcomment(e.target.value)}
                />
             </div>
              <div>
                <Button onClick={postComments}>
                  Upload post
                </Button>
              </div>
        </div>
    )
}