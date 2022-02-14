import React from "react";
import InstagramEmbed from 'react-instagram-embed';

export default function Rightpost(){

    return(
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
    )
}