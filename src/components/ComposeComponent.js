import React from 'react'

const ComposeComponent=(props)=>{



    const subjectContent=(e)=>{
        props.updateSubjectContent(e);
    }

    const bodyContent=(e)=>{
        props.updateBodyContent(e);
    }

    const saveMessage=()=>{
        props.saveMessage();
    }

    if (props.showComponent===true){
        return(
            
                <form class="form-horizontal well">
                    <div class="form-group">
                        <div class="col-sm-8 col-sm-offset-2">
                            <h4>Compose Message</h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="subject" class="col-sm-2 control-label" >Subject</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={e=>bodyContent(e)}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="body" class="col-sm-2 control-label">Body</label>
                        <div class="col-sm-8">
                            <textarea name="body" id="body" class="form-control" onChange={e=>subjectContent(e)}></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-8 col-sm-offset-2">
                            <input type="submit" value="Send" class="btn btn-primary" onClick={saveMessage}/>
                        </div>
                    </div>
                </form>
        )
        }else{
            return (
                <div></div>
            )
        }

}

export default ComposeComponent