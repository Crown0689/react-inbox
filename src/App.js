
import React, { Component } from 'react'
import ToolbarContainer from './components/toolbarContainer'
import MessageView from './components/MessageView'
import './App.css';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messageList: [],


     
    }

  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({ messageList: json });
  }


  toolbarSelectButtonClicked = () => {
    let allMessagesSelected= this.state.messageList.every(message => message.selected);
    let someMessagesSelected= this.state.messageList.some(message => message.selected);
    let noMessagesSelected= this.state.messageList.every(message => !message.selected);
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
    this.setState({ messageList: newMessageList } )
 
  }



  markAsReadButtonClicked=()=>{
    var newMessageList=[]
    newMessageList=this.state.messageList.map(message =>{
      if (message.selected && !message.read){
        return {
          ...message,
          read:true
        }
      }else{
        return message
      }
    })
    this.updateMessageListInState(newMessageList)
  }

  markAsUnreadButtonClicked=()=>{
      var newMessageList =[]
    newMessageList=this.state.messageList.map(message=>{
      if(message.selected&&message.read){
        return{
          ...message,
          read: false
        }
      }else{
        return message
      }
    })
    this.updateMessageListInState(newMessageList)
  }

  addLabelToMessage=(e)=>{
    var newMessageList =[]
    newMessageList=this.state.messageList.map(message=>{
      var newLabelValue=e.target.value
      if(!message.labels.some(l=>(l==newLabelValue))&&message.selected){
        
        var newLabel=[
          ...message.labels,
          newLabelValue
        ]
     
        return{
          ...message,
          labels: newLabel
        }
      }else{
        return message
      }
    })
    this.updateMessageListInState(newMessageList)
  }

  deleteMessageFromList=(e)=>{
    var newMessageList =[]
    newMessageList=this.state.messageList.filter(message=>!message.selected===true)
    this.updateMessageListInState(newMessageList)
  }
  

  removeLabelFromMessage=(e)=>{
    var newMessageList =[]
    newMessageList=this.state.messageList.map(message=>{
      var newLabelValue=e.target.value
      if(message.labels.some(l=>(l==newLabelValue))&&message.selected){
        
        var newLabel=message.labels.filter(l=>l!==newLabelValue)
        console.log(newLabel)
     
        return{
          ...message,
          labels: newLabel
        }
      }else{
        return message
      }
    })
    this.updateMessageListInState(newMessageList)
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
          deleteMessageFromList={this.deleteMessageFromList}/>

        <MessageView key={this.state} messageList={this.state.messageList} 
        starSelectButtonClicked={this.starSelectedButtonClicked} 
        messageSelectButtonClicked={this.messageSelectButtonClicked} 
        />
      </div>
    );
  }
};

export default App;
