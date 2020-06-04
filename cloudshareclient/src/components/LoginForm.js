import React, { Component} from 'react'
import {Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import query from '../queries/getLoggedInUser'
import Loader from 'react-loader-spinner'
import { MDBInput } from "mdbreact";



import design from '../public/images/design.png'

import '../public/css/authentication.css'



class LoginForm extends Component{
    constructor(props){
        super(props)

        this.state = { email :"", password:"", errors:[], loading : false}
    }


    componentDidUpdate(prevProps){
        const {user} = this.props.data
        if(user){
            const { username } = user
            localStorage.setItem('username', username)
            this.props.history.push(`/${username}`)
        }
        
    }

    showSpinner(){
        if (this.state.loading){
        return ( <div className = "overlay">
                    <div className = "auth-loader"> 
                    <Loader type="BallTriangle" color="rgb(255,255, 255)" height={80} width={80} />
                    </div> 
                </div>
                )
            }
         
    }



    onSubmit(event){
        event.preventDefault();
        this.setState({loading : true})

        const _saveUserData = (token) => {
            localStorage.setItem('token', token)
        }
        

        this.props.mutate({
            variables :{ 
                username : this.state.email,
                password : this.state.password
            }
            
        }).then((data)=>{
            this.props.data.refetch()
            const { token} = data.data.tokenAuth
            _saveUserData(token)   
        })
        .catch((res)=>{
            const errors = res.graphQLErrors.map((error)=>{
               return error.message
            })
            this.setState({errors, email : "", password : "", loading: false})
            

        })

    }

    render(){
        return(
            <div>
                {this.showSpinner()}
                <div className = "login-form container">
                    <div className = "row">
                        <div className = "col-md-6">
                        
                            <h1>AWPLODER</h1>
                            
                            {/* the actual form itself */}
                            <div>
                                <form onSubmit = {this.onSubmit.bind(this)} >
                                    <h4 id = "login-header">LOGIN</h4>

                                    <div className="email-div">
                                        <MDBInput label="Email" value = {this.state.email} type = "email"
                                        onChange={(e)=>this.setState({email : e.target.value})} required/>
                                    </div>

                                    <div className="password-div">
                                        <MDBInput  
                                        value = {this.state.password}
                                        onChange={(e)=>this.setState({password : e.target.value})}
                                        type = "password" label="Password" required/>
                                    </div>
                                
                                    <button type = "submit" className=  "btn btn-primary"> Login</button>
                                </form>
                                <div className = "auth-error">

                                
                                {this.state.errors.map((error)=>{
                                return( <div key= {error}>{error}</div>)
                                })}
                                </div>
                            </div>

                            <div className = "signup-option">
                                <span>Don't have an account?</span>
                                <Link to = "/signup" id = "signup-here"> Click here to create an account</Link>
                            </div>
                        </div>


                        <div className = "col-md-6 login-design"> <img src={design} alt="design"/> </div>
                    </div>
                </div>
            </div>
        
        )
    }
}



const mutation = gql`
mutation LoginUser($username: String!, $password: String!){
    tokenAuth(username: $username, password: $password){
      token
    }
  }


`



export default graphql(query)(
   graphql(mutation)(LoginForm)
)