import React, {Component} from 'react';

import Header from './Header'
import Sidebar from './Sidebar'
import PageLinks from './PageLinks'
import DisplaAudios from './DisplayAudios'


class Audios extends Component{
    render(){
        return(
            
            <div id="outer-container" > 
                <Sidebar pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } audiosPage = {true}/>
                
                <div id = "page-wrap">
                    <Header/>
                    <div className = "upload-body ">
                        {/* <PageLinks/> */}
                            <DisplaAudios/>
                        
                    </div>
                </div>
            </div>
        
        )
    }
}

export default Audios