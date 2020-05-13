import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import userIcon from '../public/images/icon.png'
import bookImage from '../public/images/book.png'
import '../public/css/header.css'


class Header extends Component{
    render(){
      const username = localStorage.getItem('username')
        return(
            <div className = "header">
                <nav className = "navbar  navbar-expand">
                   
                    <Link className = "navbar-brand" to = {`/homepage/${username}`}>
                        <img src={ bookImage } alt="logo-image"/>
                        <span className="platform">  CLOUDSHARE  </span>
                    </Link>
                    

                    {/* <form class="form-inline header-form md-form my-2 my-lg-0 ">
                        <input class="form-control" type="search" placeholder="Search"/>
                        <button class="btn btn-success">Search</button>
                    </form> */}
    
                        <span className="user">
                            <img src={userIcon} className = "img-fluid"  alt="userIcon"/>
                            <span id = "username"> {username} </span>
                        </span>
                    
                </nav>
                
            </div>
        )
    }
}

export default Header