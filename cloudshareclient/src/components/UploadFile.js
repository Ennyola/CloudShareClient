import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import uploadImage from '../public/images/upload.png'
import '../public/css/header.css'
import ApolloClient from 'apollo-client'
import { InMemoryCache} from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import  gql  from 'graphql-tag'
import { useMutation} from '@apollo/react-hooks'

import getImage from '../queries/getImage'



const UploadFile =(props)=> {

            const [mutate] = useMutation(mutation,{
                client
            })
            const [image, setImage] = useState(null)

            function onChange({    target: {   validity,files: [file],},}) {
                if (validity.valid){
                    setImage(file)
                } 
             }

            
            
        
                return(

                    <div class="upload">
                        <form onSubmit = {(e)=>{
                            e.preventDefault();
                            mutate({ variables: { image, username: props.username }, refetchQueries:()=>[
                                {query: getImage,
                                variables: {username : props.username}
                                }
                                ]}
                                );

                        }}>
                            <label for="upload-file"> 
                                <img src={uploadImage} alt="upload-image"/><br/>
                                <span> Click to upload a File </span>
                            </label>
                            
                            <input
                            onChange = {onChange}
                            type="file"  id="upload-file"/><br/>
                            <button type = "submit"> Submit </button>
                        </form>
                        
                    </div>
                )
        
            
         }
        




const link = createUploadLink({
    uri: 'http://127.0.0.1:4000/graphiql/'
})

const client = new ApolloClient({
    link,
    cache : new InMemoryCache()
})

const mutation = gql`
mutation addImage($image: Upload!, $username: String!) {
    uploadImage(image: $image, username: $username) {
      id
    }
  }
  

`



export default UploadFile