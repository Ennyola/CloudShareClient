import React, {Component} from 'react'


export default (WrappedComponent)=>{
    class RequireAuth extends Component{

        componentDidMount(){
            const token = localStorage.getItem('token')
            if(!token){
              
                this.props.history.push('/login')
            }
        }


        render(){
            return <WrappedComponent {...this.props} />
            
        }
     }
     return RequireAuth
}