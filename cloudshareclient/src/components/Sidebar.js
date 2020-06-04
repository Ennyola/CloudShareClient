import React ,{ Component } from "react";
import { scaleRotate as Menu } from 'react-burger-menu'
import {Link, withRouter} from 'react-router-dom'

class Sidebar extends Component{

    // disableCloseOnEs
    onLogoutClick(){
      localStorage.clear()
      //pure javascript function to reload a page
      this.props.history.push('/')
      
  }
  colouredImage(){
    const  coloredLink = <span style = {{color: "#FB6B46"}}><i className="fas fa-images"></i> <span className ="sideLinks"> Images </span></span>
    const normalLink = <span><i className="fas fa-images"></i> <span className ="sideLinks"> Images </span></span>
    return this.props.imagePage ? coloredLink: normalLink
  }
  colouredVideo(){
    const  coloredLink = <span style = {{color: "#FB6B46"}}><i className="fas fa-video"></i> <span className ="sideLinks"> Videos </span></span>
    const normalLink = <span><i className="fas fa-video"></i> <span className ="sideLinks"> Videos </span></span>
    return this.props.videoPage ? coloredLink: normalLink
  }
  colouredAudio(){
    const  coloredLink = <span style = {{color: "#FB6B46"}}><i className="fas fa-music"></i> <span className ="sideLinks"> Audios </span></span>
    const normalLink = <span><i className="fas fa-music"></i> <span className ="sideLinks"> Audios </span></span>
    return this.props.audiosPage ? coloredLink: normalLink
  }
  colouredDocument(){
    const  coloredLink = <span style = {{color: "#FB6B46"}}><i className="fas fa-copy"></i> <span className ="sideLinks"> Documents </span></span>
    const normalLink = <span><i className="fas fa-copy"></i> <span className ="sideLinks"> Documents </span></span>
    return this.props.documentsPage ? coloredLink: normalLink
  }

    render(){
      const username = localStorage.getItem("username")
        return(
          <Menu  {...this.props}>
          <div className = "message">
           <span className = "hello"> Hello </span>  {username}!
          </div>
          <Link  to ={{ pathname: `/${username}/images`}}  className="menu-item" >
           {this.colouredImage()}
          </Link>
          <Link to = {{ pathname: `/${username}/videos`}}  className="menu-item" >
            {this.colouredVideo()}
          </Link>
          <Link to ={{ pathname: `/${username}/audios`}}  className="menu-item" >
           {this.colouredAudio()}
          </Link>
          <Link to ={{ pathname: `/${username}/documents`}} className="menu-item"> 
           {this.colouredDocument()}
          </Link>

          <button onClick = {this.onLogoutClick.bind(this)} className = "btn btn-danger" id = "logout">Logout</button>
      </Menu>
        )
    }
}

export default withRouter(Sidebar)