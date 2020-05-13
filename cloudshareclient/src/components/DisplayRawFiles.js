import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import ApolloClient from "apollo-client";
import { InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'


import query from '../queries/getRawFile'
import uploadFileMutation from '../mutations/uploadFileMutation'
import deleteRawFileMutation from '../mutations/deleteRawFileMutation'
import uploadImage from '../public/images/upload.png'

const DisplayRawFiles = (props)=>{
    const user = localStorage.getItem('username')
    // get all documents
    const { data, loading, error } = useQuery(query,{
        variables :{username : user},
        client
    })

    // send file to graphQl endpoint
    const [mutate] = useMutation(uploadFileMutation,{
        client
    })
    const [file, setFile] = useState(null)
    function onChange({    target: {   validity,files: [file],},}) {
        if (validity.valid){
            setFile(file)
        } 
     }
     //Delete file mutation
     const [ deleteMutation] = useMutation(deleteRawFileMutation, {
        client
    });

    const onClick =(url)=>{
        deleteMutation({
            variables:{url},
            refetchQueries : [{
                query,
                variables : {username: user}
            }],
        })
    }

    
     if (loading) return( <div>Loading...</div> )
     if (error) return(<div> Error fetching files</div>)

    const {getRawFiles} = data

    const displayRawFiles = ()=>{
        if (getRawFiles){
            return getRawFiles.map(({id, url, size})=>{
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
    }


    
    return(
        <div className = "row">
            <div className="col-md-6">
                <div className = "files">
                    <ul>
                        {displayRawFiles()}      
                    </ul>
                </div>
            </div>
            <div className="col-md-6">
                {/* <UploadFile username = {user} query = {getVideosQuery}/> */}
                <div class="upload">
                    <form onSubmit = {(e)=>{
                        e.preventDefault();
                        mutate({ 
                         variables: { file, username: user },
                        refetchQueries:[{ 
                        query,
                            variables : { username : user }
                        
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


export default DisplayRawFiles