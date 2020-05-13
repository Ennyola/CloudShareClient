import React, { Component } from 'react'

import Header from './Header.js'
import Sidebar from './Sidebar'
import PageLinks from './PageLinks'
import DisplayImages from './DisplayImages'
import '../public/css/burger.css'

class Homepage extends Component{
    render(){
        const { username } = this.props.match.params
        return( 
            <div id="outer-container">
                <Sidebar pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }/>
                
                <div id = "page-wrap">
                    <Header username = { username } />
                    <div className = "upload-body ">
                        <PageLinks/>
                        <DisplayImages/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage