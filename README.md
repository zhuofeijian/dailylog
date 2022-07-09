# dailylog -- a daily log for node
a very simple nodejs daily log,just log things day by day on filesystem



#how to use

code like  
var logger = require('dailylog').getlog({logdir:'./logs',name:'mylog'});  
logger.log('hello,world');

then you will see log at ./logs/mylog-2022-07-09.txt,
and the content like "16:29:38.316|hello,world"


#how to install

npm install dailylog
