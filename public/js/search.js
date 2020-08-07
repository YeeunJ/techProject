const search = document.querySelector('#search_btn');
$(search).click(function (){
   alert("검색..");
});

//Time 지정 검색
var now = new Date();
var real_now = new Date();
getDefaultSetting(now);
var hour, minute, second, time, year, month, day, date;

//지난 7일 총인원이 default
getWeekData();
submit();


function getDefaultSetting(now){
  hour = now.getHours()>9 ? ''+now.getHours() : '0'+now.getHours();
  minute = now.getMinutes()>9 ? ''+now.getMinutes() : '0'+now.getMinutes();
  second = '00';
  time = hour + ":" + minute + ":" + second;
  if(hour<8){
      var yesterDate = now.getTime() - (1 * 24 * 60 * 60 *1000);
      now.setTime(yesterDate);
      time="20:00:00"; //전날 끝 시간 초기 값
  }
  if(hour>=20){
    time="20:00:00";
  }
  year = now.getFullYear();
  month = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
  date = year + '-' + month + '-' + day;

  /*
  교수님이 처음에 말씀하신 초기 값
  $('#date_from').val(date);
  $('#date_to').val(date);
  $('#time_from').val('08:00:00'); //시작 초기 값
  $('#time_to').val(time);*/
}

function lastWeek() {
  var d = new Date();
  var dayOfMonth = d.getDate()
  d.setDate(dayOfMonth - 6)
  return d;
}

function lastDay() {
  var d = new Date();
  var dayOfMonth = d.getDate()
  d.setDate(dayOfMonth - 1)
  return d;
}

function lastHour() {
  var d = new Date();
  var lh = d.getHours()
  d.setHours(lh - 1);
  return d;
}

function getDate(d){
  var y = d.getFullYear();
  var m = (d.getMonth()+1)>9 ? ''+(d.getMonth()+1) : '0'+(d.getMonth()+1);
  var n = d.getDate()>9 ? ''+d.getDate() : '0'+d.getDate();
  return y + '-' + m + '-' + n;
}

function getTime(d){
  var h = d.getHours()>9 ? ''+d.getHours() : '0'+d.getHours();
  var m = d.getMinutes()>9 ? ''+d.getMinutes() : '0'+d.getMinutes();
  var s= '00';
  return h + ":" + m + ":" + s;
}

function getWeekData(){
  var lastweek = lastWeek();
  $('#date_from').val(getDate(lastweek)); //date
  $('#date_to').val(getDate(real_now)); // real_now
  $('#time_from').val(getTime(lastweek)); //'00:00:00'
  $('#time_to').val(getTime(lastweek)); //'00:00:00'
}

const btn1 = document.querySelector('#chartBtn1');
const btn2 = document.querySelector('#chartBtn2');
const btn3 = document.querySelector('#chartBtn3');

function submit(){
  var result_from = $('#date_from').val()+" "+$('#time_from').val();
  $('#result_from').val(result_from);
  var result_to = $('#date_to').val()+" "+$('#time_to').val();
  $('#result_to').val(result_to);
}

$(btn1).click(function(){
  getWeekData();
  submit();
});

$(btn2).click(function(){
  var lastday = lastDay();
  $('#date_from').val(getDate(lastday)); //date
  $('#date_to').val(getDate(real_now)); //date
  $('#time_from').val(getTime(lastday)); //'08:00:00'
  $('#time_to').val(getTime(real_now)); //time
  submit();
});

$(btn3).click(function(){
  var lasthour = lastHour();
  //alert(lasthour);
  $('#date_from').val(getDate(lasthour)); //date
  $('#date_to').val(getDate(real_now)); //date
  $('#time_from').val(getTime(lasthour)); //'08:00:00'
  $('#time_to').val(getTime(real_now)); //time
  submit();
});
