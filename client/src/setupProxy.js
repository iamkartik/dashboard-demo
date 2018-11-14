/**
 * Proxy file to forward ports in case of development setup
 */
const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/login', { target: 'http://localhost:9000/' }));
  app.use(proxy('/logout', { target: 'http://localhost:9000/' }));
  app.use(proxy('/user/current', { target: 'http://localhost:9000/' }));
  app.use(proxy('/analytics/**/**', { target: 'http://localhost:9000/' }));
  app.use(proxy('/analytics/total/**/**', { target: 'http://localhost:9000/' }));
  app.use(proxy('/analytics/agg/**/**/**', { target: 'http://localhost:9000/' }));

}