import React, { Component } from 'react'
import ApolloClient from "apollo-client";
import { InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http'
import {useQuery, useMutation} from '@apollo/react-hooks'

import getImage from '../queries/getImage'


import '../public/css/header.css'
import  gql  from 'graphql-tag';

const  DisplayImages = (props)=>{

             const {loading, data, error, refetch} = useQuery(getImage,{
                variables : {username: props.username}, client
            }); 
            const [ deleteImageMutation] = useMutation(mutation, {
                client
            });

            const onClick=(url)=>{
                deleteImageMutation({
                    variables:{url}
                }).then((data)=>{
                    refetch()
                }
                )
            }

            if (loading) return <div>Loading...</div> 
            if (error) return `error ${error}` 
            const  {getfiles} = data
            
            const displayImages = ()=>{
                if (getfiles){ 
                    return getfiles.map(({id, url, size})=>{
                        return(
                            <li key = {id}>
                                <a href={url} target="_blank" rel="noopener noreferrer"> {id} </a>
                                <i class="fas fa-trash"  onClick ={()=> {onClick(url)}}></i>  
                                <span className="file-size">{size}</span>
                                <hr/>   
                            </li>
                        )
                    })
                }
                };
            
            
                        
            return(
                <div className = "files ">
                    <ul>
                        {displayImages()}     
                    </ul>
                </div>
             )
            
        }       
     

const link = new createHttpLink({
    uri: 'http://127.0.0.1:4000/graphiql/'
})


const client = new ApolloClient({
    link,
    cache : new InMemoryCache({
        dataIdFromObject: o => o.id 
    })
    
});

const mutation  = gql`
mutation DeleteImage($url : String! ){
    deleteImage(url:$url){
      id
    }
  }
`

export default DisplayImages