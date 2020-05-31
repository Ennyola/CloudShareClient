import React, {Component} from 'react';


import Header from './Header'
import Sidebar from './Sidebar'

import DisplayVideos from './DisplayVideos'


class Videos extends Component{
    render(){
        return(
            
            <div id="outer-container" > 
                <Sidebar pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } videosPage={true}/>
                
                <div id = "page-wrap">
                    <Header/>
                    <div className = "upload-body ">
                        <DisplayVideos/>
                        
                    </div>
                </div>
            </div>
        
        )
    }
}

export default Videos
