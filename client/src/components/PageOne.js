import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutUser,fetchCountrySectorAgg,fetchSectorActivityAgg} from '../actions';
import Header from './Header';
import {Bar} from 'react-chartjs-2';

/** This class displayes two stacked bar graphs
 * 
 */
class PageOne extends Component{

    componentDidMount(){
        // get sector/activity and country/sector aggregations
        this.props.fetchCountrySectorAgg(10);
        this.props.fetchSectorActivityAgg(10);
    }

    createChartData(data,cat){
        let renderData={};
        // data is redux state containing two agg values csagg,sagg
        // checking if data exists and contains category and the category is not empty
        // agg:{sagg:{data:......}}
        if(data && data[cat] && Object.keys(data[cat]).length>0){
            // array of colors to choose from 
            const bgColors=['rgba(56, 187, 156,0.8)','rgba(243,220,97,0.8)','rgba(243,146,97,0.8)',
                            'rgba(234,107,141,0.8)','rgba(140, 234, 110,0.5)','rgba(67, 229, 249,0.7)',
                            'rgba(243,97,97,0.8)','rgba(168, 228, 218,0.8)','rgba(228, 90, 68,0.7)',
                            'rgba(101,97,243,0.8)','rgba(56, 187, 156,0.8)','rgba(243,220,97,0.8)','rgba(243,146,97,0.8)',
                            'rgba(234,107,141,0.8)','rgba(140, 234, 110,0.5)','rgba(67, 229, 249,0.7)',
                            'rgba(243,97,97,0.8)','rgba(168, 228, 218,0.8)','rgba(228, 90, 68,0.7)',
                            'rgba(101,97,243,0.8)'];

            // get the aggregate sagg/csagg
            let aggregate = data[cat];
            
            // datasets array for storing stacked charts
            let datasets = [];
            // get the no of keys in sagg/agg 's data field to iterate and
            // calculate percents
            let aggdata = Object.keys(aggregate.data);
            for(let i=0;i<aggdata.length;i++){
                // get the data from i'th key of sagg/csagg's data
                // will be used to calculate %
                let sdata = Object.values(aggregate.data[aggdata[i]]);
                // get the sum of the array
                let sum = sdata.reduce((p,n)=>p+n,0);
                // get the keys these will be the labels for each bar
                let subLabels = Object.keys(aggregate.data[aggdata[i]]);

                for(let j=0;j<sdata.length;j++){
                    // individual bar dataset object
                    let dataset ={};
                    dataset["label"] = subLabels[j];
                    dataset["data"] = [(((parseInt(sdata[j],10)/sum).toFixed(2))*120).toFixed(1)];
                    dataset["backgroundColor"] = bgColors[j];
                    dataset["stack"]= aggregate.mainCategory[i];
                    datasets.push(dataset);
                }
            }
            renderData["datasets"] = datasets;
            //renderData["labels"]=aggregate.mainCategory.map((e,i)=>i);
        }
        
        return renderData;
    }

    // These options allow chart js to stack charts
    barChartOptions(data,cat){
        let options ={};
        if(data && data[cat] && Object.keys(data[cat]).length>0){
          options= {
              scales: {
                xAxes: [{
                  stacked: true,
                  ticks:{
                      callback:function(value,index,values){
                        return value;
                      }
                  }
               }],
                yAxes: [{
                     stacked: true,
                     
                  }]
              }
            };
        }
        return options;
    }

    render(){
        const {auth,agg} = this.props;
    
        return(
            <div>
                {(!auth || !auth.isAuthenticated) &&
                (<Redirect to='/'/>)}
                <Header />
                <div className="container">
                    <div className="row">
                    <div className="col s12">
                        <h3>Distribution of Activities across Sectors</h3>
                            <Bar data={this.createChartData(agg,'sagg')}
                            options={this.barChartOptions(agg,'sagg')}
                            height={250} />
                        </div>
                        <div className="col s12">
                            <h3>Distribution of Sectors across Countries</h3>
                            <Bar data={this.createChartData(agg,'sagg')} 
                            options={this.barChartOptions(agg,'sagg')}
                            height={250}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({auth,agg}){
    return {auth,agg};
}

export default connect(mapStateToProps,{logoutUser,
    fetchCountrySectorAgg,fetchSectorActivityAgg})(PageOne);