import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../public/css/header.css'

class PageLinks extends Component{
    render(){
        const username = localStorage.getItem('username')
        return(
            <div className="navigation">
                    <ul className="nav">
                        <li className="nav-item">
                            {/* <Link className="nav-link active" to="/homepage/:username/">All Files</Link> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={{ pathname:`/homepage/${username}/audios`}}>Audio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={{ pathname:`/homepage/${username}/documents`}}>Documents</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={{ pathname:`/homepage/${username}/images`}}>Images</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to= {{ pathname:`/homepage/${username}/videos`}}> Videos </Link>
                        </li>
                    </ul>
                </div>
        )
    }
}
export default PageLinks