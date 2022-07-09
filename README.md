# dailylog -- a daily log for node
a very simple nodejs daily log,just log things day by day on filesystem

#how to use

code like  
var logger = require('dailylog').getlog({logdir:'./logs',name:'mylog'});  
logger.log('hello,world');

then you will see log at ./logs/mylog-yyyy-mm-dd.txt,  
and the content like 'hh:mm:ss.SSS|hello,world'

#how to install\n
npm install dailylog
