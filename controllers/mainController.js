/**
 * This file contains all the analytics and test functions
 * Once routed the request comes to a particular function here
 * The data is fetched from DB and response is send 
 */
const models = require('../models');
const {sequelize,Sequelize} = models;

/**
 * getTotalData - is a function that aggregates the count of a categorical variable
 */
module.exports.getTotalData = (req,res)=>{
    // area - which category should be fetched
    // no - how many results are req
    const {area,no} = req.params;

    // validating for number and malformed query
    if(isNaN(no)){
        return res.status(422).send({err:'Malformed query ,no can only be a number'});
    }
    const areas =['sector','country','activity','region'];
    if(areas.indexOf(area)===-1){
        return res.status(422).send({err:'Malformed query ,aggregate area should be in "sector,country,activity"'});
    }
    // default 10 results
    const limit = parseInt(no||10);
   
    //fetching the data fromm db
    models.Loans.findAll({
        attributes:[`${area}`,[models.sequelize.fn('count',models.sequelize.col('id')),'count']],
        group:[`${area}`],
        order:[[models.Sequelize.literal('count'),'DESC']],
        limit
        
     }).then(data=>{
         // return response
         const result = data.map(d=>d.dataValues);
         res.status(200).send({data:result});
     }).catch((err)=>{
         // send error message in case of error
         res.status(500).send({err:'Something went wrong we are looking into it'})
     });
}

/**
 * This function gets the total loan amount for each country
 */
module.exports.getCountrySum=(req,res)=>{
    // fetch from db
    models.Loans.findAll({
        attributes:['country',[models.sequelize.fn('sum',models.sequelize.col('loan_amount')),'count']],
        group:['country']
     }).then(data=>{
         // send response 
         const result = data.map(d=>d.dataValues);
         res.status(200).send({data:result});
     }).catch((err)=>{
         // send error in case of error
         res.status(500).send({err:'Something went wrong we are looking into it'});
     });
}

/**
 * This function finds the agrregations within subcategory
 */
module.exports.getAggregateData=(req,res)=>{
    // main - main category
    // sub - sub category
    // no - no of results
    const {main,sub,no} = req.params;
    
    // sanitizing input
    if(isNaN(no)){
        return res.status(422).send({err:'Malformed query ,no can only be a number'});
    }

    const areas =['sector','country','activity','region'];

    if((areas.indexOf(main)===-1)|| (areas.indexOf(sub)===-1)){
        return res.status(422).send({err:'Malformed query,parms should be in "sector,country,activity"'});
    }

    //find the category=>subcategoty values
    models.Loans.findAll({
        attributes:[`${main}`,[models.sequelize.fn('JSON_ARRAYAGG',models.sequelize.col(`${sub}`)),'count']],
        group:[`${main}`],
        limit:parseInt(no)
      }).then(data=>{
          // each subcategory is an array of values [a,a,c,s,a,x...]
          // aggregating the response into counts for each subcategory
          // final response => category:{subc1:12,subc2:19....}
          let response={};
          let mainLabels =[];
          let subLabels =[];
          // loop over data
          for(let i=0;i<data.length;i++){
              // get the main category
             let category = data[i].dataValues[`${main}`]; 
             //pushing into a mainCategory array as well to keep count of all main Categories
             mainLabels.push(category);
             // get the subcategoris for each category
             let activities = data[i].dataValues.count;
             // reduce it to get the count
             let result = activities.reduce((object,key)=>{
                            if(subLabels.indexOf(key)===-1){
                                // adding the new subcategories into an array of subCategories
                                subLabels.push(key)}
                            object[key] = object[key]?object[key]+1:1;
                            return object;
                            },{});
            // add result to response                
            response[category]=result; 
          }
          // success
          res.status(200).send({data:response,mainCategory:mainLabels,subCategory:subLabels});
      }).catch(err=>{
          // error
        res.status(500).send({err:'Something went wrong we are looking into it'})
    });
}

/**
 * This method is to check the health of server and db
 */
module.exports.heartbeat = (req,res)=>{
    // find a user
    models.Users.findOne({
        where:{
            username:'admin'
        }
    }).then((d)=>{
        // return success
        res.send('all working');
    }).catch(err=>{
        // return error
        res.status(500).send({err});
    });
    
}

/**
 * This function gets the average amount(lend/fund) across an area
 */
module.exports.getAvgAggregateData=(req,res)=>{
    const {amt,area,no} = req.params;

    // sanitizing input
    if(isNaN(no)){
        return res.status(422).send({err:'Malformed query ,no can only be a number'});
    }

    const areas =['sector','country','activity','region'];

    if((areas.indexOf(area)===-1)){
        return res.status(422).send({err:'Malformed query,parms should be in "sector,country,activity"'});
    }

    const amount= ['loan_amount','funded_amount']
    if((amount.indexOf(amt)===-1)){
        return res.status(422).send({err:'Malformed query,'});
    }

    models.Loans.findAll({
        attributes:[`${area}`,[models.sequelize.fn('avg',models.sequelize.col(`${amt}`)),'amount']],
        group:[`${area}`]
        
     }).then(data=>{
        // send response 
        const result = data.map(d=>d.dataValues);
        res.status(200).send({data:result});
    }).catch((err)=>{
        // send error in case of error
        res.status(500).send({err:'Something went wrong we are looking into it'});
    });
}