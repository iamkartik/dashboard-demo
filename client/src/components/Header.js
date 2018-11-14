import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutUser} from '../actions';

class Header extends Component{

    renderNav(auth){
        if(auth && auth.isAuthenticated){
            return(
                <ul id="nav-mobile" className="right hide-on-med-and-down ">
                    <li><Link to="/page/one">Agrregation</Link></li>
                    <li><Link to="/page/two">Geo</Link></li>
                    <li><button id="logout-button" className="waves-effect waves-light btn-flat" 
                    onClick={this.props.logoutUser}>Logout</button></li>
                </ul>
            );
        }
        return(<Fragment></Fragment>)
    }

    render(){
        return(
        <div className="navbar-fixed">    
            <nav className="header-nav">
                <div className="nav-wrapper">
                    <Link to="/home" className="main-logo brand-logo">Logo</Link>                
                        {this.renderNav(this.props.auth)}
                </div>
            </nav>
        </div>    
        );
    }
}

function mapStateToProps({auth}){
    return {auth};
}


export default connect(mapStateToProps,{logoutUser})(Header);