import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import ApolloClient from "apollo-client";
import { InMemoryCache} from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { saveAs } from 'file-saver';
import {WhatsappShareButton, TwitterShareButton, WhatsappIcon, TwitterIcon} from 'react-share'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import {MDBPopover} from 'mdbreact'

import deleteAudioMutation from '../mutations/deleteAudioMutation'
import uploadFileMutation from '../mutations/uploadFileMutation'
import getAudioQuery from '../queries/getAudio'
import uploadImage from '../public/images/upload.png'



const DisplayAudiosPage = (props) => {
    const user = localStorage.getItem('username')
    const {loading : queryLoading, data, error:queryError} = useQuery(getAudioQuery, {
        variables : {username : user}, client
    })

    //upload Audio mutation
    const [uploadAudio, {loading: uploadMutationLoading, error: uploadMutationError}] = useMutation(uploadFileMutation, {
        client
    })
    const [ deleteMutation] = useMutation(deleteAudioMutation, {
        client
    });

    // onChange function for upload mutation
    function onChange({    target: {   validity,files: [file],},}) {
        if (validity.valid){
            const { type  } = file              
            uploadAudio({ 
                variables: { file, username: user },
                refetchQueries:[{ 
                   query : getAudioQuery,
                    variables : { username : user }
                
                }]
            }).then(()=>{
              
                if (type.startsWith("image")){
                   props.history.push(`/${user}`)
                }
                else if(type.startsWith("audio")){
                  props.history.push(`/${user}/audios`)
                }
                else if(type.startsWith("video")){
                    props.history.push(`/${user}/videos`)
                  }
                else{
                    props.history.push(`/${user}/documents`)
                }
            })
        } 
     }
    const onClick=(url)=>{
        if(window.confirm('Are you sure you want to delete this file')){
        deleteMutation({
            variables:{url},
            refetchQueries : [{
                query : getAudioQuery,
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
    if (queryError) return (<div className = "fetch-error">  Error :(  ...There seems to be an error getting your Files. Please reload </div>)

    const { queryMusic} = data
            const sharePopover = (url)=>{
                return(  
                        <MDBPopover
                        placement="left"
                        popover
                        clickable
                        domElement
                        id="popper2"
                        >
                            <p>Share</p>
                            <div className = "share"   >
                                <WhatsappShareButton url = {url}>
                                    <WhatsappIcon size={28} round={true} className = "share-icons"/>
                                </WhatsappShareButton>
                                <TwitterShareButton url = {url} title= {"Check out this link"} via={"Awploder"}>
                                    <TwitterIcon size={28} round={true} className = "share-icons"/>
                                </TwitterShareButton>
                            </div>
                        </MDBPopover>   
                    )
        }
        const optionPopover=(url, id)=>{
        return(
                <MDBPopover
                    placement = "top"
                    popover
                    clickable
                    domElement
                    id="popper1"
                >
                <i className="fas fa-ellipsis-v"></i>
                    <div className = "options">
                    <p onClick ={()=> {download(url, id)}}>Download</p>
                    <hr/>
                        {sharePopover(url)}
                        <hr/>
                        <p onClick ={()=> {onClick(url)}}>Delete</p>
                    
                    </div>
                </MDBPopover>
        )

        }

    const displayAudios = ()=>{
        if (queryMusic){ 
            return queryMusic.map(({id, url, size})=>{
                return(
                    <li key = {id} className = "audio-list">
                        <a href={url} className = "file-link" target="_blank" rel="noopener noreferrer"> {id} </a>
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

            return uploadMutationLoading ?  loader : inputFile 
        }
    return(
            <div className = "container">
                {showLoaderOrButtonInput()}
                {uploadMutationError && <p className = "uploadButton-error">Error :( Please try again</p>} 
                <div className = "row">
                    <div className="col-md-8">
                        <div className = "files shadow-lg">
                            <ul>
                                {displayAudios()}      
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        
                        <div className="upload shadow">
                                {showLoaderOrImageInput()}
                                {uploadMutationError && <p className = "uploadImage-error">Error :( Please try again</p>}
                        </div>
                    </div>
                 </div>
            </div>  
    )
}

const link = createUploadLink({
     uri: 'https://awploder-uploadservice.herokuapp.com/graphiql/'
    
})
const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id
    })
})
export default withRouter(DisplayAudiosPage)