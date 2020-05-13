import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import ApolloClient from "apollo-client";
import { InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import gql from 'graphql-tag'


import deleteVideoMutation from '../mutations/deleteVideoMutation'
 import uploadFileMutation from '../mutations/uploadFileMutation'
import Header from './Header'
import Sidebar from './Sidebar'
import PageLinks from './PageLinks'
import UploadFile from './UploadFile'
import getVideosQuery from '../queries/getVideos'
import uploadImage from '../public/images/upload.png'


const DisplayVideos = ()=>{
            // to get the list of videos from the db
            const {data, loading} = useQuery(getVideosQuery, {
                variables : {username : "Ennyola"}, client
            })

            const [mutate] = useMutation(uploadFileMutation,{
                client
            })
            const [ deleteMutation] = useMutation(deleteVideoMutation, {
                client
            });
            const [video, setVideo] = useState(null)

            function onChange({    target: {   validity,files: [file],},}) {
                if (validity.valid){
                    setVideo(file)
                } 
             }
            //  const onSubmit=(e)=>{
            //     e.preventDefault();
            //     mutate({ 
            //         variables: { file: image, username: "Ennyola" },
            //         refetchQueries:[{ 
            //            query : getVideosQuery,
            //             variables : { username : 'Ennyola' }
                    
            //         }]
            //     })
            //  }

            
                const onClick=(url)=>{
                    deleteMutation({
                        variables:{url},
                        refetchQueries : [{
                            query : getVideosQuery,
                            variables : {username: 'Ennyola'}
                        }],
                    })
                }
             


   

    if (loading) return(  <div>Loading...</div>    )

    const {queryVideos} = data
            
            const displayVideos = ()=>{
                if (queryVideos){ 
                    return queryVideos.map(({id, url, size})=>{
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
            <div className = "row">
                <div className="col-md-6">
                    <div className = "files">
                        <ul>
                            {displayVideos()}      
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <div class="upload">
                        <form onSubmit = {(e)=>{
                            e.preventDefault();
                            mutate({ 
                            variables: { file: video, username: "Ennyola" },
                            refetchQueries:[{ 
                            query : getVideosQuery,
                                variables : { username : 'Ennyola' }
                            
                            }]
                        })     
                        }}>
                            <label htmlFor="upload-file"> 
                                <img src={uploadImage} alt="upload-image"/><br/>
                                <span> Click to upload a File </span>
                            </label>
                            
                            <input
                            onChange = {onChange}
                            type="file"  id="upload-file" required/><br/>
                            <button type = "submit"> Submit </button>
                        </form>
                    </div>
                </div>

            </div>
               
        
    )
}



const link = createUploadLink({
    uri: 'http://127.0.0.1:4000/graphiql/'
})
const client = new ApolloClient({
    link,
    cache : new InMemoryCache({
        dataIdFromObject : o => o.id
    })
})

export default DisplayVideos