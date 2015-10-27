# dailylog -- a daily log for node
a very simple nodejs daily log,just log thinks day by day on filesystem

#how to use

code like:
var logger = require('dailylog').getlog({logdir:'./logs',name:'mylog'});
logger.log('modulea>funa>something happen here');

then you will see log at ./logs/mylog_yyyy-mm-dd.txt,
and the content like 'HH:MM:SS>modulea>funa>something happen here'

#how to install
npm install dailylog
