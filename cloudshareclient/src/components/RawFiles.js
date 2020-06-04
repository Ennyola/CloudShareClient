import React, {Component} from 'react';


import Header from './Header'
import Sidebar from './Sidebar'
import DisplayRawFiles from './DisplayRawFiles'
import Footer from './Footer'

class RawFiles extends Component{
    render(){
        return(
            
            <div id="outer-container" > 
                <Sidebar pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } documentsPage = {true} />
                
                <div id = "page-wrap">
                    <Header/>
                    <div className = "upload-body ">
                        <DisplayRawFiles/>
                    </div>
                    <Footer/>
                </div>
            </div>
        
        )
    }
}

export default RawFiles
