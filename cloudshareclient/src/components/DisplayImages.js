import React, { Component, useState } from 'react'
import ApolloClient from "apollo-client";
import { InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http'
import {useQuery, useMutation} from '@apollo/react-hooks'
import { createUploadLink } from 'apollo-upload-client'

import getImage from '../queries/getImage'
import uploadFileMutation from '../mutations/uploadFileMutation'
import uploadImage from '../public/images/upload.png'


import '../public/css/header.css'
import  gql  from 'graphql-tag';

const  DisplayImages = (props)=>{

            const user = localStorage.getItem("username")

            //fetch all images if available
             const {loading, data, error, refetch} = useQuery(getImage,{
                variables : {username: user}, client
            }); 

            // delete image mutation
            const [ deleteImageMutation] = useMutation(deleteMutation, {
                client
            });

            //upload mutation
            const [mutate] = useMutation(uploadFileMutation,{
                client
            })
            const [image, setImage] = useState(null)

            function onChange({    target: {   validity,files: [file],},}) {
                if (validity.valid){
                    setImage(file)
                } 
             }

            const onClick=(url)=>{
                deleteImageMutation({
                    variables:{url},
                    refetchQueries : [{
                        query : getImage,
                        variables : {username: user}
                    }],
                })
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
                                <i className="fas fa-trash"  onClick ={()=> {onClick(url)}}></i>  
                                <span className="file-size">{size}</span>
                                <hr/>   
                            </li>
                        )
                    })
                }
                };
                        
            return(
                <div className="row">
                    <div className="col-md-6">
                        <div className = "files">
                            <ul>
                                {displayImages()}     
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="upload">
                            <form onSubmit = {(e)=>{
                                e.preventDefault();
                                mutate({ variables: { file: image, username: user },refetchQueries : [{
                            query : getImage,
                            variables : {username: user}
                                    }],
                                });
                            }}>
                                <label htmlFor="upload-file"> 
                                    <img src={uploadImage} alt="upload-image"/><br/>
                                    <span> Click to upload a File </span>
                                </label>
                                
                                <input
                                onChange = {onChange}
                                type="file"  id="upload-file"/><br/>
                                <button type = "submit"> Submit </button>
                            </form>
                            
                        </div>
                    </div>
                    
                </div>
             )
            
        }       
     

// const link = new createHttpLink({
//     uri: 'http://127.0.0.1:4000/graphiql/'
// })

const link = createUploadLink({
    uri: 'http://127.0.0.1:4000/graphiql/'
})



const client = new ApolloClient({
    link,
    cache : new InMemoryCache({
        dataIdFromObject: object => object.id
    })
    
});

const deleteMutation  = gql`
mutation DeleteImage($url : String! ){
    deleteImage(url:$url){
      id
      url
      size 
    }
  }
`
// const uploadMutation = gql`
// mutation AddFile($file: Upload!, $username: String!) {
//     uploadFile(file: $file, username: $username) {
//       url
//       id
//       size
//     }
//   }

// `



export default DisplayImages