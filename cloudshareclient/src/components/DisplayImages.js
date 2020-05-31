import React from 'react'
import ApolloClient from "apollo-client";
import { InMemoryCache} from 'apollo-cache-inmemory';
import {useQuery, useMutation} from '@apollo/react-hooks'
import { createUploadLink } from 'apollo-upload-client'
import { saveAs } from 'file-saver';
import {WhatsappShareButton, TwitterShareButton, WhatsappIcon, TwitterIcon} from 'react-share'
import Loader from 'react-loader-spinner'
import Popover from 'react-awesome-popover'


import getImage from '../queries/getImage'
import uploadFileMutation from '../mutations/uploadFileMutation'
import uploadImage from '../public/images/upload.png'


import '../public/css/header.css'
import  gql  from 'graphql-tag';

const  DisplayImages = (props)=>{
            const user = localStorage.getItem("username")

            //fetch all images if available
             const {loading : queryLoading, data, error:queryError} = useQuery(getImage,{
                variables : {username: user}, client
            }); 

            // delete image mutation
            const [ deleteImageMutation, ] = useMutation(deleteMutation, {
                client
            });

            //upload mutation
            const [mutate, {loading: uploadMutationLoading, error: uploadMutationError}] = useMutation(uploadFileMutation,{
                client
            })


            function onChange({    target: {   validity,files: [file],},}) {
                if (validity.valid){
                    mutate({ variables: { file, username: user },refetchQueries : [{
                        query : getImage,
                        variables : {username: user}
                                }],
                    });
                } 
             }

            const onClick=(url)=>{
                if(window.confirm('Are you sure you want to delete this file')){
                    deleteImageMutation({
                        variables:{url},
                        refetchQueries : [{
                            query : getImage,
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

            if (queryLoading) return (
                 <div className = "load-position"> <Loader type="TailSpin" color="#3C4A93" height={80} width={80} /></div> 
            )
            if (queryError) return (
            <div className = "fetch-error"> <h4> Error :(  ...There seems to be an error getting your Files. Please reload </h4> </div>
            
                )
            
            const  {getfiles} = data
            const sharePopover = (url)=>{
                return(  
                          <Popover placement = "right-center" arrow = {false}>
                              <p>Share</p>
                              <div className = "share"   >
                                  <WhatsappShareButton url = {url}>
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
            
            const displayImages = ()=>{
                if (getfiles){ 
                    return getfiles.map(({id, url, size})=>{
                        return(
                            <li key = {id} className = "image-list">
                                
                                <a href={url} target="_blank" rel="noopener noreferrer" download > {id} </a>
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
                                        <img src={uploadImage} alt="upload-img"/><br/>
                                        <span> Click to upload File </span>
                                    </label>
                                    <input
                                    onChange = {onChange}
                                    type="file"  id="upload-file"/>
                                 </span>
                const loader = <span className = "imageInputLoader"><Loader type="TailSpin" color="#3C4A93" height={50} width={120} /></span> 

                return uploadMutationLoading ?  loader : inputFile
            }

            const showLoaderOrButtonInput=()=>{
                const inputFile = <input id = "first-input" type="file" onChange = {onChange}/>
                const loader = <div className = "buttonInputLoader"><Loader type="TailSpin" color="#3C4A93" height={50} width={120} /></div>

                return uploadMutationLoading ?    loader :inputFile 
            }

            return(
                <div className = "container">
                    {showLoaderOrButtonInput()}
                    <div className="row">
                        <div className="col-md-8">
                            <div className = "files shadow-lg">
                                <ul >
                                    {displayImages()}     
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            
                            <div className="upload shadow">
                                    {showLoaderOrImageInput()}
                                {uploadMutationError && <p>Error :( Please try again</p>}
                                
                            </div>
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


export default DisplayImages