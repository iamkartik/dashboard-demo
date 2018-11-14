import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutUser,fetchActivityCount,fetchCountryCount,
    fetchRegionCount,fetchSectorCount} from '../actions';
import Header from './Header';
import {Line,Bar,Doughnut} from 'react-chartjs-2';

/**
 * This class is the landing page once the user logs in
 */
class Home extends Component{

    componentDidMount(){
        // fetching the graph data once component has loaded
        this.props.fetchActivityCount(10);
        this.props.fetchRegionCount(10);
        this.props.fetchSectorCount(10);
        this.props.fetchCountryCount(10);
    }
    // this method modifies the data in accordance to chartjs needs
    // common method for all charts , only labelName is changed
    createChartData(data,labelName,color){
        let renderData = {};
        // check ig data exists and has the labelName property
        if(data && data[labelName] 
            && data[labelName].length>0){
                // color values for the chart
                const colors=['rgba(255,99,132,','rgba(140, 234, 110,',
                            'rgba(228, 90, 68,','rgba(56, 187, 156,'];
                
                let values=[],labels=[];
                // loop and separte the labels and data
                for(let i=0;i<data[labelName].length;i++){
                    let tmp = Object.values(data[labelName][i]);
                    labels.push(tmp[0]);
                    values.push(tmp[1]);
                }
                
            renderData['labels'] = labels;
            const datasets=[
                {
                  label: labelName,
                  backgroundColor: `${colors[color]}0.5)`,
                  borderColor: `${colors[color]}1)`,
                  borderWidth: 1,
                  hoverBackgroundColor: `${colors[color]}0.7)`,
                  hoverBorderColor: `${colors[color]}1)`,
                  data: values
                }];
            // making dougnut colorful      
            if(labelName==='country'){
                const bgColors=['rgba(56, 187, 156,0.8)','rgba(243,220,97,0.8)','rgba(243,146,97,0.8)',
                                'rgba(234,107,141,0.8)','rgba(140, 234, 110,0.5)','rgba(67, 229, 249,0.7)',
                                'rgba(243,97,97,0.8)','rgba(168, 228, 218,0.8)','rgba(228, 90, 68,0.7)',
                                'rgba(101,97,243,0.8)'];
                datasets[0]['backgroundColor']=bgColors;
            }
            renderData['datasets']=datasets;
        }
        return renderData;
    }

    render(){
        const {auth,home} = this.props;
                
        return(
            <div>
                {(!auth || !auth.isAuthenticated) &&
                (<Redirect to='/'/>)}
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col s6 card">
                            <h4>Top Sectors</h4>
                            <Line data={this.createChartData(home,'sector',0)} height={250}/>
                        </div>
                        <div className="col s6 card">
                            <h4>Top Activity</h4>
                            <Bar data={this.createChartData(home,'activity',1)} height={250}/>
                        </div>
                        <div className="col s6 card">
                            <h4>Top Countries</h4>
                            <Doughnut data={this.createChartData(home,'country',2)} height={250}/>
                        </div>
                        <div className="col s6 card">
                            <h4>Top Regions</h4>
                            <Bar data={this.createChartData(home,'region',3)} height={250}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({auth,home}){
    return {auth,home};
}

export default connect(mapStateToProps,{logoutUser,fetchActivityCount,fetchCountryCount,
    fetchRegionCount,fetchSectorCount})(Home);