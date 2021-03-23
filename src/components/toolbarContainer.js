import React, { Component } from "react";


class ToolbarContainer extends Component {
    constructor(props) {
        super(props)

    }

    changeSelectionState = (e) => {
        this.props.toolbarSelectButtonClicked();
    }

    markAsReadButtonClicked = () => {
        this.props.markAsReadButtonClicked();
    }

    markAsUnreadButtonClicked = () => {
        this.props.markAsUnredButtonClicked();
    }


    addLabelToMessage = (e) => {
        this.props.addLabelToMessage(e);

    }

    removeLabelFromMessage = (e) => {
        this.props.removeLabelFromMessage(e);
    }

    deleteMessageFromList = (e) => {
        this.props.deleteMessageFromList(e);
    }

    calculateUnreadMessages = () => {
        return this.props.messageList.filter(messages => messages.read === false).length
    }

    showComposeMessage=()=>{
        this.props.showComposeMessage();
    }


    render() {
        if (this.props.messageList.every(message => message.selected)) {
            return (
                /*        <AllSelectedToolbar changeSelectionState = {this.changeSelectionState}
                       markAsReadButtonClicked={this.markAsReadButtonClicked}
                       markAsUnreadButtonClicked={this.markAsUnreadButtonClicked}/> */


                <div class="row toolbar">
                    <div class="col-md-12">
                        <p class="pull-right">
                            <span class="badge badge">{this.calculateUnreadMessages()}</span>
                        unread messages
                        </p>

                        <a class="btn btn-danger">
                            <i class="fa fa-plus" onClick={this.showComposeMessage}></i>
                        </a>

                        <button class="btn btn-default" onClick={this.changeSelectionState}>
                            <i class="fa fa-check-square-o"></i>
                        </button>

                        <button class="btn btn-default" onClick={this.markAsReadButtonClicked}>
                            Mark As Read
                    </button>

                        <button class="btn btn-default" onClick={this.markAsUnreadButtonClicked}>
                            Mark As Unread
                    </button>

                        <select class="form-control label-select" onChange={this.addLabelToMessage}>
                            <option>Apply label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <select class="form-control label-select" onChange={this.removeLabelFromMessage}>
                            <option>Remove label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <button class="btn btn-default" onClick={this.deleteMessageFromList}>
                            <i class="fa fa-trash-o" ></i>
                        </button>
                    </div>
                </div>
            )
        } else if (this.props.messageList.some(message => message.selected)) {
            return (
                <div class="row toolbar">
                    <div class="col-md-12">
                        <p class="pull-right">
                            <span class="badge badge">{this.calculateUnreadMessages()}</span>
                            unread messages
                        </p>

                        <a class="btn btn-danger" onClick={this.showComposeMessage}>
                            <i class="fa fa-plus"></i>
                        </a>

                        <button class="btn btn-default" onClick={this.changeSelectionState}>
                            <i class="fa fa-minus-square-o"></i>
                        </button>

                        <button class="btn btn-default" onClick={this.markAsReadButtonClicked}>
                            Mark As Read
                        </button>

                        <button class="btn btn-default" onClick={this.markAsUnreadButtonClicked}>
                            Mark As Unread
                        </button>

                        <select class="form-control label-select" onChange={this.addLabelToMessage}>
                            <option>Apply label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <select class="form-control label-select" onChange={this.removeLabelFromMessage}>
                            <option>Remove label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <button class="btn btn-default" onClick={this.deleteMessageFromList}>
                            <i class="fa fa-trash-o"></i>
                        </button>
                    </div>
                </div>
            )
        } else {
            return (

                <div class="row toolbar">
                    <div class="col-md-12">
                        <p class="pull-right">
                            <span class="badge badge">{this.calculateUnreadMessages()}</span>
                            unread messages
                        </p>

                        <a class="btn btn-danger" onClick={this.showComposeMessage}>
                            <i class="fa fa-plus"></i>
                        </a>

                        <button class="btn btn-default" onClick={this.changeSelectionState}>
                            <i class="fa fa-square-o"></i>
                        </button>

                        <button class="btn btn-default" disabled="disabled">
                            Mark As Read
                        </button>

                        <button class="btn btn-default" disabled="disabled">
                            Mark As Unread
                        </button>

                        <select class="form-control label-select" disabled="disabled">
                            <option>Apply label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <select class="form-control label-select" disabled="disabled">
                            <option>Remove label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <button class="btn btn-default" disabled="disabled">
                            <i class="fa fa-trash-o"></i>
                        </button>
                    </div>
                </div>
            )
        }
    }

}

export default ToolbarContainer