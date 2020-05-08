import React, { Component } from 'react'
import query from '../queries/getLoggedInUser'
import { graphql } from 'react-apollo'

import Header from './Header.js'
import Sidebar from './Sidebar'
import UploadBody from './UploadBody'
import '../public/css/burger.css'

class Homepage extends Component{

    onLogoutClick(){
        localStorage.clear()
        //pure javascript function to reload a page
        window.location.reload(true);
        
    }
    componentDidMount(){
        const {user} = this.props.data
        if(!user){
            console.log('User Not signed in')
            this.props.history.push('/login')
        }
    }

    render(){
        const { username } = this.props.match.params
        return( 
            <div id="outer-container">
                <Sidebar onLogoutClick = {this.onLogoutClick.bind(this)} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }/>
                <div id = "page-wrap">
                    <Header username = { username } />
                    <UploadBody username = {username}/>
                </div>


            </div>
        )
    }
}

export default graphql(query)(Homepage)