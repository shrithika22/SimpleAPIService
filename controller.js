
'use strict';

var cache = require('memory-cache');

var store=new Map();

exports.inbound=function(req,res){

    const authenticate=req.headers['authenticate'];

    if(authenticate==="SMS"){

        const sms=req.body;
        const {from,to,text}=sms;

        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            res.status(500).json({"message": "", "error":"unknown failure"});
        }
        else if(!from || !to || !text){
            if(!from){
                res.status(400).json({"message": "","error":" 'from' is missing" });
            }
            else if(!to){
                res.status(400).json({"message": "","error":" 'to' is missing" });
            }
            else{
                res.status(400).json({"message": "","error":" 'text' is missing" });
            }
        }
        else if(from && to && text){
            if(from.length<6 || from.length>16){
                res.status(400).json({"message": "","error":" 'from' is invalid" });
            }
            else if(to.length<6 || to.length>16){
                res.status(400).json({"message": "","error":" 'to' is invalid" });
            }
            else if(text.length<1 || text.length>120){
                res.status(400).json({"message": "","error":" 'text' is invalid" });
            }
            else{
                if(text.includes("STOP")||text.includes("STOP\n")||text.includes("STOP\r")||text.includes("STOP\r\n")){
                    cache.put(from,to,3600000*4) //expiry of 4 hours
                    store[from]=to
                    //res.json({message: "",error:"text contain STOP" })
                }
                res.status(200).json({"message": "inbound sms is ok", "error":""});
            }   
        }
        else{
            res.status(500).json({"message": "", "error":"unknown failure"});
        }
    }
    else{
        res.status(403).json({"error":"Authentication failed"});
    }
}


exports.outbound=function(req,res){

    const authenticate=req.headers['authenticate'];

    if(authenticate==="SMS"){
 
        const sms=req.body;
        const {from,to,text}=sms;

        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            res.status(500).json({"message": "", "error":"unknown failure"});
        }
        else if(!from || !to || !text){
            if(!from){
                res.status(400).json({"message": "","error":" 'from' is missing" });
            }
            else if(!to){
                res.status(400).json({"message": "","error":" 'to' is missing" });
            }
            else{
                res.status(400).json({"message": "","error":" 'text' is missing" });
            }
        }
        else if(from && to && text){
            if(from.length<6 || from.length>16){
                res.status(400).json({"message": "","error":" 'from' is invalid" });
            }
            else if(to.length<6 || to.length>16){
                res.status(400).json({"message": "","error":" 'to' is invalid" });
            }
            else if(text.length<1 || text.length>120){
                res.status(400).json({"message": "","error":" 'text' is invalid" });
            }
            else if(store[from]===to){
                res.status(406).json({"message": "","error":"sms from "+from+" and to "+to+" blocked by STOP request"});
            }
            else{
                res.status(200).json({"message": "inbound sms is ok", "error":""});
            }   
        }
        else{
            res.status(500).json({"message": "", "error":"unknown failure"});
        }
    }
    else{
        res.status(403).json({"error":"Authentication failed"});
    }
}