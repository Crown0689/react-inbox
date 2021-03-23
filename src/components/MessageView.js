import React from 'react'
import Message from './Message'



const MessageView =(props) => {
  
    
    const messages = props.messageList.map((element, index)=>{
       
        return (<Message key={element.id} message={element} messageSelectButtonClicked = {props.messageSelectButtonClicked} starSelectButtonClicked={props.starSelectButtonClicked}/>)
    })

    return(
        <div>
            {messages}
        </div>
       
    )

}

export default MessageView
