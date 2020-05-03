import React, { Component } from 'react'
import uploadImage from '../public/images/upload.png'
import '../public/css/header.css'

class UploadFile extends Component{
    constructor(props){
        super(props)

        this.state = { file : null, files : [] }
    }

    onSubmit(event){
        event.preventDefault()
        console.log(this.state.file)
        console.log(this.state.files)
    }



    render(){
        return(
            <div class="upload">
                <form onSubmit = {this.onSubmit.bind(this)}>
                    <label for="upload-file"> 
                        <img src={uploadImage} alt="upload-image"/><br/>
                        <span> Click to upload a File </span>
                    </label>
                    <input
                    onChange = {e => this.setState({file: e.target.files[0], files: e.target.files})}
                     type="file"  id="upload-file" multiple/><br/>
                    <button type = "submit"> Submit </button>
                </form>
            </div>
        )
    }
}
export default UploadFile