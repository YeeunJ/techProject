$(document).ready(function() {
const search = $('#search_btn');
var now = new Date();
var real_now = new Date();

var hour, minute, second, time, year, month, day, date;
var search_from;
var search_to;
getWeekData();
submit();

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
  $('#date_from').val(getDate(lastweek));
  $('#date_to').val(getDate(real_now));
  $('#time_from').val(getTime(lastweek));
  $('#time_to').val(getTime(real_now));
}

const btn0 = $('#chartBtn0');
const btn1 = $('#chartBtn1');
const btn2 = $('#chartBtn2');
const btn3 = $('#chartBtn3');

function submit(){
  var result_from = $('#date_from').val()+" "+$('#time_from').val()+":00";
  $('#result_from').val(result_from.substr(0,19));
  var result_to = $('#date_to').val()+" "+$('#time_to').val()+":00";
  $('#result_to').val(result_to.substr(0,19));
}

$(btn0).click(function(){
  submit();
  search_from=$('#result_from').val();
  search_to=$('#result_to').val();
});

$(btn1).click(function(){
  getWeekData();
  submit();
});

$(btn2).click(function(){
  var lastday = lastDay();
  $('#date_from').val(getDate(lastday));
  $('#date_to').val(getDate(real_now));
  $('#time_from').val(getTime(lastday));
  $('#time_to').val(getTime(real_now));
  submit();
});

$(btn3).click(function(){
  var lasthour = lastHour();
  $('#date_from').val(getDate(lasthour));
  $('#date_to').val(getDate(real_now));
  $('#time_from').val(getTime(lasthour));
  $('#time_to').val(getTime(real_now));
  submit();
});

var date_change = $('#date_from');
var date_change2 = $('#date_to');
var time_change = $('#time_from');
var time_change2 = $('#time_to');

date_change.change(function(){
  $('#time_from').val('00:00:00');
  submit();
});
time_change.change(function(){
  submit();
});
date_change2.change(function(){
  $('#time_to').val('23:59:00');
  submit();
});
time_change2.change(function(){
  submit();
});

$('#searchBtn').click(function(){
  var data = {"starttime": document.getElementById('result_from').value, "endtime": document.getElementById('result_to').value};
  //var data = {"starttime": '2020-07-26 12:00:22', "endtime": '2020-08-02 12:00:22'};
  console.log(data);
  data = JSON.stringify(data);

  // content-type을 설정하고 데이터 송신
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './search');
  xhr.setRequestHeader('Content-type', "application/json");
  xhr.send(data);

  // 데이터 수신이 완료되면 표시
  xhr.addEventListener('load', function(){
    var result = JSON.parse(xhr.responseText);
    var dt1 = result.data1;
    var dt2 = result.data2;
    var dt3 = result.data3;
    var dt4 = result.data4;
    var dt5 = result.data5;

    console.log(dt3);
    console.log(dt4);
    console.log(dt5);

    var color = ['#4abd9e', '#4097f5', '#f68645', '#dd497d', '#febe27', '#a14cfc', '#84c460', '#fa4cd7', '#3ed4de', '#fc5551'];
    var startTime = new Date(document.getElementById('result_from').value.replace('-','/').replace('-','/').substring(0,10));
    var endTime = new Date(document.getElementById('result_to').value.replace('-','/').replace('-','/').substring(0,10));
    var sTime = new Date(document.getElementById('result_from').value.replace('-','/').replace('-','/').substring(0,10));
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for(var i=0; i<= dt1.camNum; i++){
      data1[i] = [];
      for (var j= 0; j<= Math.floor((endTime.getTime() - startTime.getTime()) / (1000*60*60*24)); j++){
        data1[i].push(0);
      }
    }

    for(var i=0; i< dt3.length; i++){
    var date = dt3[i].date;
    date = date.replace('-','/').replace('-','/');
    dateTemp = new Date(date);
    data1[dt3[i].cameraID-1][Math.floor((today.getTime() - dateTemp.getTime()) / (1000*60*60*24))] = dt3[i].people;
    }
    console.log(data1);
    var label = [];
    label[0]= sTime.format('MM월 dd일(KS)');
    for (var i= 1; i<= Math.floor((endTime.getTime() - startTime.getTime()) / (1000*60*60*24)); i++){
    sTime.setDate(sTime.getDate()+1);

    label[i] = sTime.format('MM월 dd일(KS)');
    }

    var datasets1 = [];
    for(var i=0; i< dt1.camNum; i++){
    var dataset = {
        label: '카메라 ' + (i+1),
        borderColor: color[i],
        backgroundColor: color[i],
        fill: false,
        data: data1[i].reverse()
      };
    datasets1.push(dataset);
    }

    var chart1 = {
      labels: label,
      datasets: datasets1
    };

  $('#myChart4').show();
  var ctx = $('#myChart4');

  var myChart = new Chart(ctx, {
    type: 'line',
    data: chart1,
    options: {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: false,
      },
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines:{
            color: 'rgba(255, 255, 255, 0.4)',
            lineWidth:1
          }
        }],
        ticks: {
          stepSize: 10,
          beginAtZero: false,
					fontSize : 16,
          padding: '80px',
        }
      },
      legend: {
               display: true,
               fontSize : 20,
               position: 'top',
               align: 'start',
               labels: {
                usePointStyle: 'true'
            }
           }
    }
  });

  $('#myChart1').hide();
  $('#myChart2').hide();
  $('#myChart3').hide();
  $('#chartBtn1').attr('class', 'criteria');
  $('#chartBtn2').attr('class', 'criteria');
  $('#chartBtn3').attr('class', 'criteria');

  $('.img_wrapper').children().remove();

  for(var i=0; i<dt2.length; i++) {
    $('.img_wrapper').eq(dt2[i].cameraID-1).append('<div class="img_date"><img src="./resources/images/original/'+dt2[i].name+'" alt="" value="'+dt2[i].cameraID+'" onclick=\'showDetail("'+dt2[i].name+'", "'+dt2[i].cameraID+'", "'+dt2[i].originalDate+'", "'+dt2[i].peopleCNT+'");\' /><br><p style="display:inline-block;">'+dt2[i].originalDate+'</p><p style="display: inline-block; float:right; padding-right: 20px;">'+dt2[i].peopleCNT+'명</p></div>');
  }

  for(var i=0; i<dt1.camNum; i++){

    if($('.img_wrapper').eq(i).children().length == 0){
      $('.img_wrapper').eq(i).append('<div class="append">No Image</div>');
    }
  }
  });
});
});
