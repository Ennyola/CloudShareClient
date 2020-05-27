import React, {Component} from 'react';


import Header from './Header'
import Sidebar from './Sidebar'
import PageLinks from './PageLinks'
import DisplayRawFiles from './DisplayRawFiles'

class RawFiles extends Component{
    render(){
        return(
            
            <div id="outer-container" > 
                <Sidebar pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } documentsPage = {true} />
                
                <div id = "page-wrap">
                    <Header/>
                    <div className = "upload-body ">
                        {/* <PageLinks/> */}
                        <DisplayRawFiles/>
                    </div>
                </div>
            </div>
        
        )
    }
}

export default RawFiles
