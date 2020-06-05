import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import  gql  from 'graphql-tag'
import design from '../public/images/design.png'
import { Link } from 'react-router-dom'
import query from '../queries/getLoggedInUser'
import Loader from 'react-loader-spinner'
import { MDBInput } from "mdbreact";
import * as EmailValidator from 'email-validator';

class SignupForm extends Component{
    
    constructor(props){
        super(props)

        this.state = {email : "", username:"", password:"", rtPassword:"",errors:[], loading : false}
    }

    componentDidUpdate(nextProps){
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
                    <Loader type="Bars" color="#ffffff" height={80} width={80} />
                    </div> 
                </div>
                )
        }
         
    }
    
    onSubmit(event){
        event.preventDefault()
        this.setState({loading:true})
        if(this.state.password !== this.state.rtPassword){
            this.setState({errors:["Passwords do not match"], loading:false})
        }
        else if(!EmailValidator.validate(this.state.email)){
            this.setState({errors:["Please use a valid Email address"], loading:false })
        }
        else{        
                this.props.mutate({
                    variables :{
                        email : this.state.email,
                        username : this.state.username,
                        password: this.state.password
                    }
                }).then((data)=>{
                    this.props.data.refetch()
                    const{ token } = data.data.createUser.tokenAuth
                    localStorage.setItem('token', token)
                })
                .catch((res)=>{
                    const errors = res.graphQLErrors.map((error)=>{
                        return error.message
                    })

                    this.setState({errors, email : "", password : "",loading:false})
                })
            }
    }


    render(){
        return(

            <div>
                {this.showSpinner()}
                <div className = "row">
                    {/*  page design image */}
                    <div className= "signup-design col-md-6">
                        <img className = "img-fluid" src= {design} alt="design body"/>
                    </div>

                    {/* the actuall body of the page */}
                    <div className="signupForm col-md-6">
                        <h1>AWPLODER</h1>
                        <form onSubmit= {this.onSubmit.bind(this)}>
                            <h4 id = "signup-header">SIGN-UP</h4>
                            {/* email  */}
                            
                                <MDBInput 
                                value = {this.state.email}
                                onChange = {e => this.setState({email:e.target.value})}
                                type="email" name="email" label="Email" required/>
                            

                            {/* username  */}
                            
                                <MDBInput 
                                value = {this.state.username}
                                onChange = {e => this.setState({username:e.target.value})}
                                type="text" name="username" label="Username" required/>
                            
                                
                            
                                <MDBInput 
                                value = {this.state.password}
                                onChange = {e => this.setState({password:e.target.value})}
                                type="password" name="password" label="Password" required/>
                            
                            
                                <MDBInput
                                value = {this.state.rtPassword}
                                onChange = {(e)=>this.setState({rtPassword:e.target.value})}
                                type="password" name="vfpassword" label="Verify Password" required/>
                            

                            <button type="submit" className="btn btn-primary"> Submit</button>
                        </form>
                        <div className = "auth-error">
                            { this.state.errors.map((error)=>{
                            return <div key = {error}> {error} </div> 
                            }) }
                        </div>
                        <div className="login-option">
                            <p> Have an account already? <Link to = "/login"id = "login-here">Login instead</Link> </p>
                        </div>
                    </div>
                </div> 
            </div>   
        )
    }
}
const mutation = gql`
    mutation Signup($email:String!, $username :String!, $password: String!){
        createUser(email: $email, username: $username, password:$password ){
        tokenAuth(username: $email, password:$password){
            token
        }
        }
    }
`

export default graphql(mutation)(
    graphql(query)(SignupForm)
)