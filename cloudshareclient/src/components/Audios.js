import React, {Component} from 'react';

import Header from './Header'
import Sidebar from './Sidebar'
import DisplaAudios from './DisplayAudios'
import Footer from './Footer'


class Audios extends Component{
    render(){
        return(
            
            <div id="outer-container" > 
                <Sidebar pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } audiosPage = {true}/>
                
                <div id = "page-wrap">
                    <Header/>
                    <div className = "upload-body ">
                            <DisplaAudios/>  
                    </div>
                    <Footer/>
                </div>
            </div>
        
        )
    }
}

export default Audios