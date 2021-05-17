'use strict';

const controller = require('./controller');

const rateLimit=require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hr in milliseconds
  max: 50,
  message: "You have exceeded the 50 requests in 1 hr limit for 'from'!", 
  statusCode: 429,
  headers: true,
});

function send405(req, res, next) {
    res.send(405, {error:'Method Not Allowed'});
  }

module.exports = function(app){
    app.route('/inbound/sms')
        .post(controller.inbound)
        .all(send405) 
        
    app.route('/outbound/sms')
        .post(controller.outbound, rateLimiter)
        .all(send405)
};