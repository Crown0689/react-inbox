import React, { Component} from 'react'






class Message extends Component {
    constructor(props) {
        super(props)
    
    }

    
    

    checkSelected = (e) => {
       
        this.props.messageSelectButtonClicked(e.target.id);
    }
    
   

    adjustClassNameMessage = () => {
        
        const className = "row message" +
            (this.props.message.read === true ? " read" : " unread") +
            (this.props.message.selected === true ? " selected" : "")
        return className;
    }

  

    adjustClassNameStar = () => {
        const star = (this.props.message.starred === true ? " star fa fa-star-o" : " star fa fa-star")
        return star
    }

    showLabels = () => {

        const labels = this.props.message.labels.map(e => {
            return (<span className=" label label-warning"> {e} </span>)
        })
        
        return labels

    }

    changeStar=(e)=>{
        this.props.starSelectButtonClicked(e.target.id)
    }


    render() {
        return (
            <div className={this.adjustClassNameMessage()}>
                <div class="col-xs-1">
                    <div class="row">
                        <div class="col-xs-2">
                            <input type="checkbox" id={this.props.message.id} checked={this.props.message.selected} onClick={this.checkSelected} />
                        </div>
                        <div class="col-xs-2">
                            <i id={this.props.message.id} className={this.adjustClassNameStar()} onClick={this.changeStar}></i>
                        </div>
                    </div>
                </div>
                <div class="col-xs-11">
                    {this.showLabels()}
                    <a href="#">
                        {this.props.message.subject}
                    </a>
                </div>
            </div>
        )
    }

}


export default Message