import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import ApolloClient from "apollo-client";
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'


import deleteAudioMutation from '../mutations/deleteAudioMutation'
import uploadFileMutation from '../mutations/uploadFileMutation'
import Header from './Header'
import Sidebar from './Sidebar'
import PageLinks from './PageLinks'
import UploadFile from './UploadFile'
import getAudioQuery from '../queries/getAudio'
import uploadImage from '../public/images/upload.png'


const DisplayAudiosPage = () => {
    //upload Audio mutation
    const [uploadAudio] = useMutation(uploadFileMutation, {
        client
    })
    const [ deleteMutation] = useMutation(deleteAudioMutation, {
        client
    });

    //audio file saved using react State
    const [audio, setAudio] = useState(null)

    // onChange function for upload mutation
    function onChange({    target: {   validity,files: [file],},}) {
        if (validity.valid){
            setAudio(file)
        } 
     }
     //onSubmit for upload Mutation
     const onSubmit=(e)=>{
        e.preventDefault();
        uploadAudio({ 
            variables: { file: audio, username: "Ennyola" },
            refetchQueries:[{ 
               query : getAudioQuery,
                variables : { username : "Ennyola" }
            
            }]
        })
     }

     
        const onClick=(url)=>{
            deleteMutation({
                variables:{url},
                refetchQueries : [{
                    query : getAudioQuery,
                    variables : {username: 'Ennyola'}
                }],
            })
        }
     

    const {data, loading, error} = useQuery(getAudioQuery, {
        variables : {username : "Ennyola"}, client
    })
    if (loading) return( <div> Loading... </div>)

    const { queryMusic} = data

    const displayAudios = ()=>{
        if (queryMusic){ 
            return queryMusic.map(({id, url, size})=>{
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
                            {displayAudios()}      
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <div class="upload">
                        <form onSubmit = {onSubmit} >
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
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id
    })
})
export default DisplayAudiosPage