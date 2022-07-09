var fs = require('fs');
var PATH = require('path');

const dateFormat = function(date,fmt) {
    if(typeof date == 'number'){
        date = new Date(date);
    }
    var o = { 
       "M+" : date.getMonth()+1,                 //月份 
       "d+" : date.getDate(),                    //日 
       "h+" : date.getHours(),                   //小时 
       "m+" : date.getMinutes(),                 //分 
       "s+" : date.getSeconds(),                 //秒 
       "q+" : Math.floor((date.getMonth()+3)/3), //季度 
      // "S"  : date.getMilliseconds()             //毫秒 
    };

    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }

    if(/(S+)/.test(fmt)) {
        var s = date.getMilliseconds();
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (s) : (("000"+ s).substr((""+ s).length)));
    }


    return fmt; 
}


var gettodaytime = function(){
	var date = new Date();
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date.getTime();
}

var gettodaystr = function(date){
	date = date || new Date();
	return dateFormat(date,"yyyy-mm-dd");
}

var logs = {};

var Log = function(config){
	this.logdir = config.logdir;
	this.name = config.name;
	this.dirok = false;
	this.err = null;
	var SELF = this;
	fs.mkdir(this.logdir,{ recursive: true }, (err) => {
		if (err){
		    console.log('Log:' + err.stack);
		    SELF.err = err;
		    return;
		}
		SELF.dirok = true;
		if(SELF.msgs){
		    for(var i = 0 ; i < SELF.msgs.length ; i ++){
			SELF.log(SELF.msgs[i],true);
		    }
		    delete SELF.msgs;
		}
  	});	
};

Log.prototype.log = function(msg,notime){
	
	if(!notime){
		var d = dateFormat(new Date(),'HH:MM:ss>');
		var msg = d + msg + "\n";
	}

	if(!this.dirok){
		if(!this.msgs){
			this.msgs = [];
		}
		this.msgs.push(msg);
		if(this.msgs.length>50){//only cache 50 when dir not ok
			this.msgs.shift();
		}
		return;
	}

	if(!this.writable){
		var datestr = gettodaystr();
		var path = PATH.join(this.logdir,this.name+ "_" + datestr + '.txt');
		this.writable = fs.createWriteStream(path,{flags:'a'});
		this.writable.datestr = datestr;
	}
	this.writable.write(msg);
};

Log.prototype.checklogfile = function(){
	if(this.writable){
		var datestr = gettodaystr();
		if(datestr != this.writable.datestr){
			this.writable.end();
			this.writable = null;
		}
	}	
};

var getlog = function(config){
	config.logdir = PATH.resolve(config.logdir || '.');
    	config.name = config.name || 'log';
	var key = PATH.join(config.logdir,config.name);
	var log = logs[key];
	if(log){
		return log;
	}
	log = new Log(config);
	logs[key] = log;
	return log;
}

var timeoutfunction = function(){
	for(var x in logs){
		var log = logs[x];
		log.checklogfile();
	}
	var now = new Date().getTime();
	var timeto = 24*60*60*1000 + gettodaytime() - now;
	setTimeout(timeoutfunction,timeto+2);	
};
setTimeout(timeoutfunction,1);

exports.getlog = getlog;
