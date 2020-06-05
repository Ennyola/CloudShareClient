import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Footer from './Footer'
import '../public/css/landing.css'
import landing from '../public/images/landing.jpg'

class LandingPage extends Component{
    render(){
        return(
            <div>
                <div className = "landing">
                <div className = "landing-intro">
                        <div className = "d-flex justify-content-end login-or-signup">
                            <Link to = "/login" className = "btn goto-login">Login</Link> 
                            <Link to = "/signup" className = "btn goto-signup btn-outline-indigo">Signup</Link>
                        </div>
                        <div className = "landing-body">
                            <div>
                                <img src={landing} className = "animated animate__fadeInTopLeft img-fluid shadow-lg" alt= ""/> 
                            </div>
                            <div className = "welcome-text">
                                <h2 className = "animated animate__backInDown wt-header"> WELCOME TO  <span className = "site-name">AWPLODER </span> </h2>
                                <p className = " animated animate__fadeInRightBig description">A Fast, Secure, and Free Upload Service</p>
                                <Link to = "/login" className = " animated animate__backInUp get-started btn btn-outline-deep-orange wave-effect">GET STARTED</Link>
                            </div> 
                        </div>
                         <a href="#hit" className = "animated animate__bounceIn go-down" ><i className="fas fa-angle-down"></i></a> 
                    </div>
                    <div className = "how-it-works" id = "hit">
                        <h2 id = "hit-header"> HOW IT WORKS</h2>
                        <div className = "container">
                            <div className="row">
                                <div className="col-md-4">
                                    <h3 className = "text-center explanation-header"> UPLOAD <i className="fas fa-cloud-upload-alt"></i></h3>
                                    <p className = "explanation">Have A file you want to save, our Optimised Algorithm Ensures you do that in a single click. We Support file Uploads Ranging from PNG,JPG, MP3,MP4, MPEG,GIF, PDF To Raw files like .txt, .csv, .env and so on. </p> 
                                </div>
                                <div className="col-md-4"> 
                                    <h3 className = "text-center explanation-header"> DOWNLOAD <i className="fas fa-cloud-download-alt"></i></h3>
                                    <p className = "explanation">Files Uploaded Into our Server are available for Downloads. A fast, Secure and Reliable download Method Ensures your files are downloaded Easy and Fast.</p>
                                </div>
                                <div className="col-md-4"> 
                                    <h3 className = "text-center explanation-header"> SHARE <i className="fas fa-share-alt"></i></h3> 
                                    <p className = "explanation"> You Can Share Files that is Uploaded to Social media platforms Easy. Want To see how That works, why don't you check it out <Link to = "/login">here</Link></p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer/>
                </div>
                
            </div>
                
             
           
        )
    }
}

export default LandingPage