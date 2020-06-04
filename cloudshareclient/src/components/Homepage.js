import React, { Component } from 'react'

import Header from './Header.js'
import Sidebar from './Sidebar'
import DisplayImages from './DisplayImages'
import Footer from './Footer'

import '../public/css/burger.css'

class Homepage extends Component{
    render()
    {
        // const { username } = this.props.match.params
        return( 
            <div id="outer-container">
                <Sidebar pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } imagePage = {true}/>
                <div id = "page-wrap">
                    <Header/>
                    <div className = "upload-body ">
                        <DisplayImages/>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Homepage