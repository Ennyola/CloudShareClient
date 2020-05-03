import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import design from '../public/images/design.png'
import { Link } from 'react-router-dom'
import query from '../queries/getLoggedInUser'

class SignupForm extends Component{
    
    constructor(props){
        super(props)

        this.state = {email : "", username:"", password:""}
    }

    componentDidUpdate(nextProps){
        const {user} = this.props.data
        if(user){
            this.props.history.push('/homepage')
        }
    }

    onSubmit(event){
        event.preventDefault()

        this.props.mutate({
            variables :{
                email : this.state.email,
                username : this.state.username,
                password: this.state.password
            }
        }).then((data)=>{
            this.props.data.refetch()
            const{ token } = data.data.createUser.tokenAuth
            localStorage.setItem('user-token', token)
        })
    }


    render(){
        return(

            
            <div className = "row">
                {/*  page design image */}
                <div className= "col-md-6">
                    <img className = "img-fluid" src= {design} alt="design body"/>
                </div>

                {/* the actuall body of the page */}
                <div className="col-md-6">
                    <h1>CLOUDSHARE</h1>
                    <form onSubmit= {this.onSubmit.bind(this)}>
                         {/* email  */}
                        <div className="md-form">
                            <input 
                            value = {this.state.email}
                            onChange = {e => this.setState({email:e.target.value})}
                            type="email" name="email" className="form-control" placeholder="email" required/>
                        </div>

                        {/* username  */}
                        <div className="md-form">
                            <input 
                            value = {this.state.username}
                            onChange = {e => this.setState({username:e.target.value})}
                            type="text" className="form-control" name="username" placeholder="username" required/>
                        </div>

                        <div className="md-form">
                            <input 
                            value = {this.state.password}
                            onChange = {e => this.setState({password:e.target.value})}
                            type="password" name="password" className="form-control" placeholder="Password" required/>
                        </div>
                        <div className="md-form">
                            <input type="password" name="vfpassword" className="form-control" placeholder="Verify Password" required/>
                        </div>

                        <button type="submit" className="btn btn-primary"> Submit</button>
                    </form>
                    <div className="login-option">
                        <p> Have an account already? <Link to = "/login">Login instead</Link> </p>
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