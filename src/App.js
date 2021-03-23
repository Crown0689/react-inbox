
import React, { Component } from 'react'
import ToolbarContainer from './components/toolbarContainer'
import MessageView from './components/MessageView'
import ComposeComponent from './components/ComposeComponent'
import './App.css';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messageList: [],
      bodyContent:"empty",
      subjectContent:"empty",
      showComposer:false

    }

  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({ messageList: json });
  }


  




toolbarSelectButtonClicked = () => {
  let allMessagesSelected = this.state.messageList.every(message => message.selected);
  let someMessagesSelected = this.state.messageList.some(message => message.selected);
  let noMessagesSelected = this.state.messageList.every(message => !message.selected);
  this.selectAllMessages(((noMessagesSelected || someMessagesSelected) && !allMessagesSelected));
}

messageSelectButtonClicked = (id) => {
  var newMessageList = []
  newMessageList = this.state.messageList.map(message => {
    var selected = message.selected === "" ? false : message.selected;
    if (message.id == id) {
      return {
        ...message,
        selected: !selected
      }
    } else {
      return message
    }
  })
  this.updateMessageListInState(newMessageList)
}


starSelectedButtonClicked = (id) => {
  var messageids=[]
  messageids=[
    ...messageids,
    id
  ]
  var newMessageList = []
  newMessageList = this.state.messageList.map(message => {
    var starred = message.starred === "" ? false : message.starred;
    if (message.id == id) {
      return {
        ...message,
        starred: !starred
      }
    } else {
      return message
    }
  })
  this.updateMessageListInState(newMessageList)
  this.updateMessageInApi(messageids,"star")
}


selectAllMessages = (areSelected) => {
  var newMessageList = []
  newMessageList = this.state.messageList.map(message => {
    return {
      ...message,
      selected: areSelected
    }
  });
  this.updateMessageListInState(newMessageList)
}

updateMessageListInState = (newMessageList) => {
  this.setState({ messageList: newMessageList })

}



markAsReadButtonClicked = () => {
  var newMessageList = []
  var apiMessageList=[]
  
  newMessageList = this.state.messageList.map(message => {
    var messageId=message.id
    if (message.selected && !message.read) {
      apiMessageList=[
        ...apiMessageList,
        messageId
      ]
      return {
        ...message,
        read: true
      }
    } else {
      return message
    }
  })
  this.updateMessageInApi(apiMessageList,"read", "read", true)
  this.updateMessageListInState(newMessageList)
}

markAsUnreadButtonClicked = () => {
  var newMessageList = []
  var apiMessageList=[]
  
  newMessageList = this.state.messageList.map(message => {
    var messageId=message.id
    if (message.selected && message.read) {
      apiMessageList=[
        ...apiMessageList,
        messageId
      ]
      return {
        ...message,
        read: false
      }
    } else {
      return message
    }
  })
  this.updateMessageInApi(apiMessageList, "read", "read",false)
  this.updateMessageListInState(newMessageList)
}

async updateMessageInApi(messageIds,cmd,cmdAttr,commandValue) {
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'PATCH',
    body: JSON.stringify({
      messageIds: messageIds,
      "command": cmd,
      [cmdAttr]:commandValue
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  const messageList = await response.json()

}

addLabelToMessage = (e) => {
  var newMessageList = []
  var newLabel=[]
  var messageIds=this.getSelectedMessages();
 
  
  newMessageList = this.state.messageList.map(message => {
    var newLabelValue = e.target.value
    if (!message.labels.some(l => (l == newLabelValue)) && message.selected) {

      newLabel = [
        ...message.labels,
        newLabelValue
      ]

      return {
        ...message,
        labels: newLabel
      }
    } else {
      return message
    }
  })
  console.log(newLabel)
  this.updateMessageListInState(newMessageList)
  this.updateMessageInApi(messageIds,"addLabel","label",e.target.value)
}

deleteMessageFromList = (e) => {
  var newMessageList = []
  var messageIds=this.getSelectedMessages();
  console.log(messageIds)
  newMessageList = this.state.messageList.filter(message => !message.selected === true)
  this.updateMessageListInState(newMessageList)
  this.updateMessageInApi(messageIds,"delete")
}

getSelectedMessages =()=>{
  return this.state.messageList
  .filter(message=>message.selected===true)
  .map(message=>{return message.id})
}


removeLabelFromMessage = (e) => {
  var messageIds=this.getSelectedMessages();
  var newMessageList = []
  newMessageList = this.state.messageList.map(message => {
    var newLabelValue = e.target.value
    if (message.labels.some(l => (l == newLabelValue)) && message.selected) {

      var newLabel = message.labels.filter(l => l !== newLabelValue)
      console.log(newLabel)

      return {
        ...message,
        labels: newLabel
      }
    } else {
      return message
    }
  })
  this.updateMessageListInState(newMessageList)
  this.updateMessageInApi(messageIds,"removeLabel","label",e.target.value)
}




showComposeMessage = () =>{
  var hideComponent=!this.state.showComposer;
  this.setState({showComposer:hideComponent})
}

updateBodyContent=(e)=>{
  this.setState({bodyContent:e.target.value})
}

updateSubjectContent=(e)=>{
  this.setState({subjectContent:e.target.value})
}
async saveMessageToApi(subjectContent, bodyContent) {
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'POST',
    body: JSON.stringify({
      subject: [subjectContent],
      body: [bodyContent],
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  const messageList = await response.json()
  console.log(messageList)
  setTimeout(()=>this.setState({showComposer:false}) , 0);
  
}

saveMessage=()=>{
  var subjectContent=this.state.subjectContent;
  var bodyContent=this.state.bodyContent;
  this.saveMessageToApi(subjectContent,bodyContent)
}


render() {
  return (
    <div>

      <ToolbarContainer
        messageList={this.state.messageList}
        toolbarSelectButtonClicked={this.toolbarSelectButtonClicked}
        markAsReadButtonClicked={this.markAsReadButtonClicked}
        markAsUnredButtonClicked={this.markAsUnreadButtonClicked}
        addLabelToMessage={this.addLabelToMessage}
        removeLabelFromMessage={this.removeLabelFromMessage}
        deleteMessageFromList={this.deleteMessageFromList} 
        showComposeMessage={this.showComposeMessage}/>
      <ComposeComponent 
      showComponent={this.state.showComposer}
      updateSubjectContent={this.updateSubjectContent}
      updateBodyContent={this.updateBodyContent}
      saveMessage={this.saveMessage}/>
      <MessageView key={this.state} messageList={this.state.messageList}
        starSelectButtonClicked={this.starSelectedButtonClicked}
        messageSelectButtonClicked={this.messageSelectButtonClicked}
      />
    </div>
  );
}
};

export default App;
