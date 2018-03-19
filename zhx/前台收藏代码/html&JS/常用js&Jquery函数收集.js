






/**
 * 日期==当前时间 
 * 获取当前时间
 */
function p(s) {
    return s < 10 ? '0' + s: s;
}

var myDate = new Date();
//获取当前年
var year=myDate.getFullYear();
//获取当前月
var month=myDate.getMonth()+1;
//获取当前日
var date=myDate.getDate(); 
var h=myDate.getHours();       //获取当前小时数(0-23)
var m=myDate.getMinutes();     //获取当前分钟数(0-59)
var s=myDate.getSeconds();  

var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);

如果需要月份加1的话

var myDate2 = new Date();
myDate2.setMonth(month + 1);

//获取当前年
var year2=myDate2.getFullYear();
//获取当前月
var month2=myDate2.getMonth();
//获取当前日
var date2=myDate2.getDate();

var now2=year2+'-'+p(month2)+"-"+p(date2);