
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
    this.initSelectState();

  }

  initSelectState = () => {
    this.setState({
      allMessagesSelected: this.state.messageList.every(message => message.selected),
      someMessagesSelected: this.state.messageList.some(message => message.selected),
      noMessagesSelected: this.state.messageList.every(message => !message.selected)
    })
  }


  toolbarSelectButtonClicked = () => {
    this.selectAllMessages(((this.state.noMessagesSelected || this.state.someMessagesSelected) && !this.state.allMessagesSelected));
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
    this.setState({ messageList: newMessageList }, () => {
      this.initSelectState()
    })
  }


  render() {
    return (
      <div>

        <ToolbarContainer allMessagesSelected={this.state.allMessagesSelected}
          someMessagesSelected={this.state.someMessagesSelected}
          noMessagesSelected={this.state.noMessagesSelected}
          toolbarSelectButtonClicked={this.toolbarSelectButtonClicked} />

        <MessageView messageList={this.state.messageList} messageSelectButtonClicked={this.messageSelectButtonClicked} />
      </div>
    );
  }
};

export default App;
