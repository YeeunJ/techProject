const search = document.querySelector('#search_btn');
$(search).click(function (){
   alert("검색..");
});

const btn1 = document.querySelector('#chartBtn1');
const btn2 = document.querySelector('#chartBtn2');
const btn3 = document.querySelector('#chartBtn3');

$(btn1).click(function(){
  var result_from = $('#date_from').val()+" "+$('#time_from').val();
  $('#result_from').val(result_from);
  var result_to = $('#date_to').val()+" "+$('#time_to').val();
  $('#result_to').val(result_to);
});
$(btn2).click(function(){
  var result_from = $('#date_from').val()+" "+$('#time_from').val();
  $('#result_from').val(result_from);
  var result_to = $('#date_to').val()+" "+$('#time_to').val();
  $('#result_to').val(result_to);
});
$(btn3).click(function(){
  var result_from = $('#date_from').val()+" "+$('#time_from').val();
  $('#result_from').val(result_from);
  var result_to = $('#date_to').val()+" "+$('#time_to').val();
  $('#result_to').val(result_to);
});

//Time 지정 검색
var now = new Date();
getDefaultSetting(now);

function getDefaultSetting(now){
  var hour = now.getHours();
  var minute = now.getMinutes()>9 ? ''+now.getMinutes() : '0'+now.getMinutes();
  var second = '00';
  var time = hour + ":" + minute + ":" + second;
  if(hour<8){
      var yesterDate = now.getTime() - (1 * 24 * 60 * 60 *1000);
      now.setTime(yesterDate);
      time="20:00:00"; //전날 끝 시간 초기 값
  }
  if(hour>=20){
    time="20:00:00";
  }
  var year = now.getFullYear();
  var month = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
  var date = year + '-' + month + '-' + day;
  $('#date_from').val(date);
  $('#date_to').val(date);
  $('#time_from').val('08:00:00'); //시작 초기 값
  $('#time_to').val(time);
}
