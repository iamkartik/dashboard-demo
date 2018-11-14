import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutUser,fetchCountrySum} from '../actions';
import Header from './Header';
import {Chart} from 'react-google-charts';


class PageTwo extends Component{

    componentDidMount(){
        this.props.fetchCountrySum();
    }    

    createChartData(data){
        let renderData=[["Country","Total Loan Value(USD)"]];
        console.log(data);
        if(data && data.sum && data.sum.length>0){
            const {sum} = data; 
            for(let i=0;i<sum.length;i++){
                let temp =[];
                temp.push(sum[i].country);
                temp.push(sum[i].count);
                renderData.push(temp);
            }
        }
        return renderData;
    }

    render(){
        const {auth,geo} = this.props;
        return(
            <div>
                {(!auth || !auth.isAuthenticated) &&
                (<Redirect to='/'/>)}
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h4>Total Loans given in a Country</h4>
                            <Chart
                                chartType="GeoChart"
                                data={this.createChartData(geo)}
                                mapsApiKey="AIzaSyDYjXmUwL6crbuft4eGaG8Er754uYKrpiY"
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({auth,geo}){
    return {auth,geo};
}

export default connect(mapStateToProps,{logoutUser,fetchCountrySum})(PageTwo);