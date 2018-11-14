const models = require('../models');
const {sequelize,Sequelize} = models;


module.exports.getTotalData = (req,res)=>{
    const {area,no} = req.params;
    if(isNaN(no)){
        return res.status(422).send({err:'Malformed query ,no can only be a number'});
    }

    const areas =['sector','country','activity','region'];
    if(areas.indexOf(area)===-1){
        return res.status(422).send({err:'Malformed query ,aggregate area should be in "sector,country,activity"'});
    }
    // default 10 results
    const limit = parseInt(no||10);
   
    models.Loans.findAll({
        attributes:[`${area}`,[models.sequelize.fn('count',models.sequelize.col('id')),'count']],
        group:[`${area}`],
        order:[[models.Sequelize.literal('count'),'DESC']],
        limit
        
     }).then(data=>{
         const result = data.map(d=>d.dataValues);
         res.status(200).send({data:result});
     }).catch((err)=>{
         res.status(500).send({err:'Something went wrong we are looking into it'})
     });
}

module.exports.getCountrySum=(req,res)=>{
    
    models.Loans.findAll({
        attributes:['country',[models.sequelize.fn('sum',models.sequelize.col('loan_amount')),'count']],
        group:['country']
     }).then(data=>{
         const result = data.map(d=>d.dataValues);
         res.status(200).send({data:result});
     }).catch((err)=>{
         res.status(500).send({err:'Something went wrong we are looking into it'});
     });
}

module.exports.getAggregateData=(req,res)=>{

    const {main,sub,no} = req.params;

    if(isNaN(no)){
        return res.status(422).send({err:'Malformed query ,no can only be a number'});
    }

    const areas =['sector','country','activity','region'];

    if((areas.indexOf(main)===-1)|| (areas.indexOf(sub)===-1)){
        return res.status(422).send({err:'Malformed query,parms should be in "sector,country,activity"'});
    }

    models.Loans.findAll({
        attributes:[`${main}`,[models.sequelize.fn('JSON_ARRAYAGG',models.sequelize.col(`${sub}`)),'count']],
        group:[`${main}`],
        limit:parseInt(no)
      }).then(data=>{
          let response={};
          let mainLabels =[];
          let subLabels =[];
          for(let i=0;i<data.length;i++){
             let category = data[i].dataValues[`${main}`]; 
             mainLabels.push(category);
             let activities = data[i].dataValues.count;
             let result = activities.reduce((object,key)=>{
                            if(subLabels.indexOf(key)===-1)
                                {subLabels.push(key)}
                            object[key] = object[key]?object[key]+1:1;
                            return object;
                            },{});
            response[category]=result; 
          }
          
          res.status(200).send({data:response,mainCategory:mainLabels,subCategory:subLabels});
      }).catch(err=>{
        res.status(500).send({err:'Something went wrong we are looking into it'})
    });
}