import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import ApolloClient from "apollo-client";
import { InMemoryCache} from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { saveAs } from 'file-saver';
import {WhatsappShareButton, TwitterShareButton, WhatsappIcon, TwitterIcon} from 'react-share'
import Loader from 'react-loader-spinner'
import Popover from 'react-awesome-popover'

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
                    if(window.confirm('Are you sure you want to delete this file')){
                    deleteMutation({
                        variables:{url},
                        refetchQueries : [{
                            query : getVideosQuery,
                            variables : {username: user}
                        }],
                    })
                }
            }
                const download=(url, id)=>{
                    const arr = url.split("upload/");
                    const flag_attachment = 'fl_attachment/';
                    const newUrl = arr.join(`upload/${flag_attachment}`)
                    saveAs(newUrl, id)        
    
                }
             


   

    if (queryLoading) return (<div className = "load-position"> <Loader type="TailSpin" color="#3C4A93" height={80} width={80} /></div> )
    if (queryError) return (<div className = "fetch-error"> <h4> Error :(  ...There seems to be an error getting your Files. Please reload </h4></div>)

    const {queryVideos} = data
    
            const sharePopover = (url)=>{
                return(  
                        <Popover placement = "right-center">
                            <p>Share</p>
                            <div className = "share" arrow = {false}>
                                <WhatsappShareButton url = {url}   >
                                    <WhatsappIcon size={28} round={true} className = "share-icons"/>
                                </WhatsappShareButton>
                                <TwitterShareButton url = {url} title= {"Check out this link"} via={"AWPLODER"}>
                                    <TwitterIcon size={28} round={true} className = "share-icons"/>
                                </TwitterShareButton>
                        </div>
                        </Popover>
                    )
        }

            const optionPopover=(url, id)=>{
            return(
            <Popover className = "pop" arrow = {false} placement = "left-center">
                <i className="fas fa-ellipsis-v"></i>
                <div className = "options">
                    <p onClick ={()=> {download(url, id)}}>Download</p>
                    {sharePopover(url)}
                    <p onClick ={()=> {onClick(url)}}>Delete</p>         
                </div>
            </Popover>
            )

            }
            
            
            const displayVideos = ()=>{
                if (queryVideos){ 
                    return queryVideos.map(({id, url, size})=>{
                        return(
                            <li key = {id}>
                                <a href={url} target="_blank" rel="noopener noreferrer"> {id} </a>
                                  
                                <span className="file-size">
                                    {size}
                                    {optionPopover(url, id)}
                                </span>
                             
                                <hr/>   
                            </li>
                        )
                    })
                }
                };

        const showLoaderOrImageInput=()=>{
            const inputFile = <span>
                                <label htmlFor="upload-file"> 
                                    <img src={uploadImage} alt="upload-image"/><br/>
                                    <span> Click to upload a File </span>
                                </label>
                                <input
                                onChange = {onChange}
                                type="file"  id="upload-file"/>
                                </span>
            const loader = <Loader type="TailSpin" color="#00BFFF" height={30} width={80} />

            return uploadMutationLoading ?  loader : inputFile 
        }
        const showLoaderOrButtonInput=()=>{
            const inputFile = <input id = "first-input" type="file" onChange = {onChange}/>
            const loader = <Loader type="TailSpin" color="#00BFFF" height={30} width={80} />

            return uploadMutationLoading ?  loader : inputFile 
        }

    return(
            <div className = "container">
            {showLoaderOrButtonInput()}
            <div className = "row">
                <div className="col-md-8">
                    <div className = "files">
                        <ul>
                            {displayVideos()}      
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
              
                    <div className="upload">     
                           {showLoaderOrImageInput()}
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