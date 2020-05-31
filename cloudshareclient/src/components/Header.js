import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import userIcon from '../public/images/icon.png'
import bookImage from '../public/images/book.png'
import '../public/css/header.css'


class Header extends Component{
    render(){
      const username = localStorage.getItem('username')
        return(
            <div className = "header shadow" >
                    <Link className = "navbar-brand" to = {`/homepage/${username}`}>
                        <img src={ bookImage } alt="logo-img"/>
                        <span className="platform">  AWPLODER  </span>
                    </Link>
    
                    <span className="user">
                        <img src={userIcon} className = "img-fluid"  alt="userIcon"/>
                        <span id = "username"> {username} </span>
                    </span>  
            </div>
        )
    }
}

export default Header