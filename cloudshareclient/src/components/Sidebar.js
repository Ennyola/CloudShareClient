import React ,{ Component } from "react";
import { push as Menu } from 'react-burger-menu'
import recentFiles from '../public/images/recentfiles.png'
import bin from '../public/images/bin.png'
import star from '../public/images/star.png'

class Sidebar extends Component{

    on

    render(){
        return(
           <Menu noOverlay  {...this.props} >
             <img src= {star} className = "img-fluid" alt="star"/>
             <a  className="menu-item"> <img src= { recentFiles } alt=""/></a>
             
             <a> <img src={bin} alt="bin"/></a>

             <button onClick = {this.props.onLogoutClick} name = "logout"  className = " btn btn-primary">logout</button>
          
           </Menu>
        )
    }
}

export default Sidebar