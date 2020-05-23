import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import ApolloClient from "apollo-client";
import { InMemoryCache} from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { saveAs } from 'file-saver';
import {WhatsappShareButton, TwitterShareButton, WhatsappIcon, TwitterIcon} from 'react-share'
import Loader from 'react-loader-spinner'

import query from '../queries/getRawFile'
import uploadFileMutation from '../mutations/uploadFileMutation'
import deleteRawFileMutation from '../mutations/deleteRawFileMutation'
import uploadImage from '../public/images/upload.png'

const DisplayRawFiles = (props)=>{
    const user = localStorage.getItem('username')
    // get all documents
    const {loading : queryLoading, data, error:queryError } = useQuery(query,{
        variables :{username : user},
        client
    })

    // send file to graphQl endpoint
    const [mutate, {loading: uploadMutationLoading, error: uploadMutationError}] = useMutation(uploadFileMutation,{
        client
    })
    const [file, setFile] = useState(null)
    function onChange({    target: {   validity,files: [file],},}) {
        if (validity.valid){
            setFile(file)
            mutate({ 
                variables: { file, username: user },
               refetchQueries:[{ 
               query,
                   variables : { username : user }
               
               }]
           }) 
        } 
     }
     //Delete file mutation
     const [ deleteMutation] = useMutation(deleteRawFileMutation, {
        client
    });

    const onClick =(url)=>{
        if(window.confirm('Are you sure you want to delete this file')){
            deleteMutation({
                variables:{url},
                refetchQueries : [{
                    query,
                    variables : {username: user}
                }],
            })
        }
    }
    const download=(url, id)=>{
        saveAs(url, id)

    }

    
    if (queryLoading) return (<div className = "load-position"> <Loader type="TailSpin" color="#3C4A93" height={80} width={80} /></div> )
    if (queryError) return (<div className = "fetch-error"> <h4> Error :(  ...There seems to be an error getting your Files. Please reload </h4> </div>)

    const {getRawFiles} = data

    const displayRawFiles = ()=>{
        if (getRawFiles){
            return getRawFiles.map(({id, url, size})=>{
                return(
                    <li key = {id}>
                        <a href={url} target="_blank" rel="noopener noreferrer"> {id} </a>
                        <span className = "display-links">
                            <i className="fas fa-download" onClick ={()=> {download(url, id)}}></i> 
                            <i className="fas fa-trash"  onClick ={()=> {onClick(url)}}></i>
                        </span>
                         <WhatsappShareButton url = {url}>
                             <WhatsappIcon size={32} round={true}/>
                        </WhatsappShareButton>
                        <TwitterShareButton url = {url} title= {"Check out this link"} via={"CloudShare"} hashtags = {["cloudshare"]}>
                            <TwitterIcon size={32} round={true}/>
                        </TwitterShareButton>
                        

                        <span className="file-size">{size}</span>
                        <hr/>   
                    </li>
                )
            })
        }
    }


    
    return(
        <div className = "container">
         <input id = "first-input" type="file" onChange = {onChange}/>
        <div className = "row">
            <div className="col-md-8">
                <div className = "files">
                    <ul>
                        {displayRawFiles()}      
                    </ul>
                </div>
            </div>
            <div className="col-md-4">
                {uploadMutationLoading && <Loader type="ThreeDots" color="#00BFFF" height={12} width={80} />}
                <div class="upload">
                    
                            
                      <span>
                        <label htmlFor="upload-file"> 
                            <img src={uploadImage} alt="upload-image"/><br/>
                            <span> Click to upload a File </span>
                        </label>
                        
                        <input
                        onChange = {onChange}
                        type="file"  id="upload-file"/><br/>
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


export default DisplayRawFiles