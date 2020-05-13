import React ,{ Component } from "react";
import { push as Menu } from 'react-burger-menu'
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
        return(
           <Menu noOverlay  {...this.props} isOpen  >
             <img src= {star} className = "img-fluid" alt="star"/>
             <a  className="menu-item"> <img src= { recentFiles } className = "img-fluid" alt=""/></a>
             
             {/* <a> <img src={bin} alt="bin"/></a> */}

             <button onClick = {this.onLogoutClick.bind(this)} name = "logout"  className = " btn btn-primary">logout</button>
          
           </Menu>
        )
    }
}

export default Sidebar