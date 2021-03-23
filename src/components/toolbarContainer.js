import React, {Component} from "react";
import StartToolbar from './startToolbar'
import SelectedToolbar from './selectedToolbar'
import AllSelectedToolbar from './allSelectedToolbar'



class ToolbarContainer extends Component {
    
    
   changeSelectionState = (e) =>{
       this.props.toolbarSelectButtonClicked();     
   }

    render() {
        if (this.props.allMessagesSelected){
            return (
                <AllSelectedToolbar changeSelectionState = {this.changeSelectionState}/>
            )
        } else if (this.props.someMessagesSelected){
            return(
                <SelectedToolbar changeSelectionState = {this.changeSelectionState}/>
            )
        } else{
            return (
                <StartToolbar changeSelectionState={this.changeSelectionState}/>
            )
    }}

}

export default ToolbarContainer