import React ,{ Component } from "react";
import { scaleRotate as Menu } from 'react-burger-menu'
import {Link} from 'react-router-dom'
import recentFiles from '../public/images/recentfiles.png'
import bin from '../public/images/bin.png'
import star from '../public/images/star.png'

class Sidebar extends Component{

    // disableCloseOnEs
    onLogoutClick(){
      localStorage.clear()
      //pure javascript function to reload a page
      window.location.reload(true);
      
  }

    render(){
      const username = localStorage.getItem("username")
        return(
           
             <Menu  {...this.props}>
                <div className = "message">
                 <span className = "hello"> Hello </span>  {username}!
                </div>
                <Link  to ={{ pathname: `/homepage/${username}/images`}}  className="menu-item" >
                  <i className="fas fa-images"></i>
                  <span className ="sideLinks">
                  Images
                  </span>
                </Link>
                <Link to = {{ pathname: `/homepage/${username}/videos`}}  className="menu-item" >
                  <i className="fas fa-video"></i>
                  <span className ="sideLinks">
                    Videos
                  </span>
                </Link>
                <Link to ={{ pathname: `/homepage/${username}/audios`}}  className="menu-item" >
                  <i className="fas fa-music"></i>
                  <span className ="sideLinks">
                    Audios
                  </span>
                </Link>
                <Link to ={{ pathname: `/homepage/${username}/documents`}} className="menu-item"> 
                  <i className="fas fa-copy"></i>
                  <span className ="sideLinks">
                    Documents
                  </span>
                </Link>

                <button onClick = {this.onLogoutClick.bind(this)} className = "btn btn-danger" id = "logout">Logout</button>
            </Menu>
          
        )
    }
}

export default Sidebar