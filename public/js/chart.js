console.log('test');
console.log(data3);
$(document).ready(function() {
  $('#myChart4').hide();
  var ctx = $('#myChart1');

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
            type: 'linear',
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
  var ctx = $('#myChart2');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: chart2,
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
          stepSize: 5
        }
      },
      legend: {
               display: true,
               position: 'top',
               align: 'start',
               labels: {
                usePointStyle: 'true',
                boxWidth: 20
            }
           }
    }
  });
  $('#myChart2').hide();
  var ctx = $('#myChart3');

  var myChart = new Chart(ctx, {
    type: 'line',
    data: chart3,
    options: {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: false,
        text: '최근 일정 시간 평균 인원수 차트'
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
          stepSize: 5
        }
      },
      legend: {
               display: true,
               position: 'top',
               align: 'start',
               labels: {
                usePointStyle: 'true',
                boxWidth: 20
            }
           }
    }
  });
  $('#myChart3').hide();
});

  $('#chartBtn1').click(function(){
    $('#myChart1').show();
    $('#myChart2').hide();
    $('#myChart3').hide();
    $('#myChart4').hide();
    $('#chartBtn1').attr('class', 'clickedCriteria');
    $('#chartBtn2').attr('class', 'criteria');
    $('#chartBtn3').attr('class', 'criteria');
  });
  $('#chartBtn2').click(function(){
    $('#myChart1').hide();
    $('#myChart2').show();
    $('#myChart3').hide();
    $('#myChart4').hide();
    $('#chartBtn2').attr('class', 'clickedCriteria');
    $('#chartBtn1').attr('class', 'criteria');
    $('#chartBtn3').attr('class', 'criteria');
  });
  $('#chartBtn3').click(function(){
    $('#myChart1').hide();
    $('#myChart2').hide();
    $('#myChart3').show();
    $('#myChart4').hide();
    $('#chartBtn3').attr('class', 'clickedCriteria');
    $('#chartBtn1').attr('class', 'criteria');
    $('#chartBtn2').attr('class', 'criteria');
  });
