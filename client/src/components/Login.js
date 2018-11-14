import React,{Component} from 'react';
import {loginUser} from '.././actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Header from './Header';

/**
 * This class contains the login component , 
 * based on the auth value the user is logged in / logged out 
 */

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    // call login 
    login=()=>{
        const {username,password} = this.state;
        if(username!=='' && password!==''){
            this.props.loginUser(username,password);
        }
    }
    // form event change
    handleChange=(prop)=>(event)=>{
        this.setState({[prop]:event.target.value});
    }

    render(){
        const {auth} = this.props;
        return(
            <div>
                {auth && auth.isAuthenticated &&
                (<Redirect to='/home'/>)}
                <Header />
                <div className="container">
                    <div className="row">
                        <div id="loginForm" className="col s6 offset-s3 card">
                            <h4 className="center">Login</h4>
                            <div className="input-field col s12">
                                <input type='text' id='username' value={this.state.username}
                                onChange={this.handleChange('username')} placeholder='Username'/>
                            </div>
                            <div className="input-field col s12">
                                <input type='password' id='password' value={this.state.password}
                                    onChange={this.handleChange('password')} placeholder='Password'/>
                            </div>        
                            <div className="input-field col s12">
                                <button className="waves-effect waves-light btn" 
                                onClick={this.login}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps,{loginUser})(Login);