import React, { Component } from 'react';
import '../public/css/header.css'

import DisplayImages from './DisplayImages'
import UploadFile from './UploadFile'


class UploadBody extends Component{
    render(){
        return(
            <div className = "upload-body ">
                <div className="navigation">
                    <ul className="nav">
                        <li className="nav-item ">
                            <a className="nav-link active " href="# ">All Files</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link " href="# ">Documents</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link " href="# ">Audio</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link " href="# ">Images</a>
                        </li>
                    </ul>
                </div>
                <div className = "row">
                    <div className="col-md-6">
                        <DisplayImages/>
                    </div>
                    <div className="col-md-6">
                        <UploadFile/>
                    </div>
                    
                </div>

                


                
            </div>
        )
    }
}

export default UploadBody