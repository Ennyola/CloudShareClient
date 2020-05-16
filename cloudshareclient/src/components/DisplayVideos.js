import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import ApolloClient from "apollo-client";
import { InMemoryCache} from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { saveAs } from 'file-saver';
import {WhatsappShareButton, TwitterShareButton, WhatsappIcon, TwitterIcon} from 'react-share'
import Loader from 'react-loader-spinner'

import deleteVideoMutation from '../mutations/deleteVideoMutation'
 import uploadFileMutation from '../mutations/uploadFileMutation'
import getVideosQuery from '../queries/getVideos'
import uploadImage from '../public/images/upload.png'


const DisplayVideos = ()=>{

            const user = localStorage.getItem('username')
            // to get the list of videos from the db
            const {loading : queryLoading, data, error:queryError} = useQuery(getVideosQuery, {
                variables : {username : user}, client
            })

            const [mutate, {loading: uploadMutationLoading, error: uploadMutationError}] = useMutation(uploadFileMutation,{
                client
            })
            const [ deleteMutation] = useMutation(deleteVideoMutation, {
                client
            });
            const [video, setVideo] = useState(null)

            function onChange({    target: {   validity,files: [file],},}) {
                if (validity.valid){
                    setVideo(file)     
                    mutate({ 
                        variables: { file, username: user },
                        refetchQueries:[{ 
                        query : getVideosQuery,
                            variables : { username : user }
                        
                        }]
                    })
                } 
             }
            

            
                const onClick=(url)=>{
                    deleteMutation({
                        variables:{url},
                        refetchQueries : [{
                            query : getVideosQuery,
                            variables : {username: user}
                        }],
                    })
                }
                const download=(url, id)=>{
                    saveAs(url, id)
    
                }
             


   

    if (queryLoading) return (<div> <Loader type="TailSpin" color="#00BFFF" height={80} width={80} /></div> )
    if (queryError) return (<div> <h4> Error :(  ...There seems to be an error getting your Files. Please reload </h4></div>)

    const {queryVideos} = data
            
            const displayVideos = ()=>{
                if (queryVideos){ 
                    return queryVideos.map(({id, url, size})=>{
                        return(
                            <li key = {id}>
                                <a href={url} target="_blank" rel="noopener noreferrer"> {id} </a>
                                
                                <i className="fas fa-download" onClick ={()=> {download(url, id)}}></i>
                                <WhatsappShareButton url = {url}>
                                    <WhatsappIcon size={32} round={true}/>
                                </WhatsappShareButton>
                                <TwitterShareButton url = {url} title= {"Check out this link"} via={"CloudShare"} hashtags = {["cloudshare"]}>
                                    <TwitterIcon size={32} round={true}/>
                                </TwitterShareButton>
                                <i className="fas fa-trash"  onClick ={()=> {onClick(url)}}></i>  
                                <span className="file-size">{size}</span>
                                <hr/>   
                            </li>
                        )
                    })
                }
                };

    return(
            <div>
            <input id = "first-input" type="file" onChange = {onChange}/>
            <div className = "row">
                <div className="col-md-8">
                    <div className = "files">
                        <ul>
                            {displayVideos()}      
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    {uploadMutationLoading && <Loader type="ThreeDots" color="#00BFFF" height={12} width={80} />}
                    <div className="upload">     
                           <span>
                                <label htmlFor="upload-file"> 
                                    <img src={uploadImage} alt="upload-image"/><br/>
                                    <span> Click to upload a File </span>
                                </label>
                                
                                <input
                                onChange = {onChange}
                                type="file"  id="upload-file" required/><br/>
                            </span>
                        {uploadMutationError && <p>Error :( Please try again</p>}
                    </div>
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