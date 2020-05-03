import React, { Component } from 'react'
import {Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import '../public/css/header.css'

class  DisplayImages extends Component{
        render(){
            return(
            <Query>
                
                    <div className = "files ">
                        <ul>
                            <li>
                                <a href="hj" target="_blank" download="fileLink"> File </a>   
                                <span className="file-size">34mb</span>
                                <hr/>   
                            </li>
                        </ul>

                    </div>
            </Query> 
            )
        }
    
}


const getFile = 

export default DisplayImages