# dailylog

Very simple Node.js daily log, just log things day by day on filesystem.

## Installation

``` bash
npm install dailylog
```

## How to Use

``` bash
var logger = require('dailylog').getlog({logdir:'./logs',name:'mylog'});  
logger.log('module>fun>something happens here');
```
Then you will see log at ./logs/mylog_yyyy-mm-dd.txt, and the content would be like 
`HH:MM:SS>modulea>funa>something happen here`


