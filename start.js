/**
 * This file contains the startup script and the PORT for the app.
 */
const app = require('./app');

app.listen(process.env.PORT||9000,()=>{
    console.log('app started');
})