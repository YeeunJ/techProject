function showDetail( name, cameraID, regDate, peopleCNT ) {
  var row_count = $('div[id*="row"]').length;

  var value = cameraID;
  console.log("value"+value);
  var real_value = cameraID;

  if(value == row_count) {
    value = Number(row_count)-Number(1);
  }

  var next = Number(value) + Number(1);
  var small1 = "row"+value;
  var small2 = "row"+next;
  for(var j=1 ; j<=row_count ; j++) {
    $('.cam_t'+j).css('color', '#ffffff');
    $('.cam_t'+j).css('borderColor', '#ffffff');
    $('#right'+j).css('right', '30px');
    $('#row'+j).css('width', '100%');
  }


  var position = Number(326)*Number(value-1);
  console.log('position: '+position);
  if(real_value==row_count) {
    $('#detail').css('top', 'initial');
    $('#detail').css('bottom', 20+'px');
  } else {
    $('#detail').css('bottom', 'initial');
    $('#detail').css('top', position+'px');
  }

  $('#'+small1).css('width', '70%');
  $('#'+small2).css('width', '70%');
  $('#right'+value).css('right', '300px');
  $('#right'+next).css('right', '300px');
  $('.cam_t'+real_value).css('color','#4abd9e');
  $('.cam_t'+real_value).css('borderColor','#4abd9e');

  $('#detail').css('display', 'block');
  $('#image').attr('src','../resources/images/original/'+name);

  $('#cam_num').html(cameraID);
  $('#date').html(regDate);
  $('#people').html(peopleCNT);
};


function imgModalClose(){
    var row_count = $('div[id*="row"]').length;

    for(var j=1 ; j<=row_count ; j++) {
      $('.cam_t'+j).css('color', '#ffffff');
      $('.cam_t'+j).css('borderColor', '#ffffff');
      $('#right'+j).css('right', '30px');
      $('#row'+j).css('width', '100%');
    }

    $('#detail').css('display','none');
    $('#cont').css('width','100%');
    $('#image').attr('src','');
};

function moveLeftScroll(id) {
  var wrapper = '.total_wrapper'+id;
  var pos = $(wrapper).scrollLeft();
  $(wrapper).scrollLeft(pos + 200);
};
function moveRightScroll(id) {
  var wrapper = '.total_wrapper'+id;
  console.log(wrapper);
  var pos = $(wrapper).scrollLeft();
  $(wrapper).scrollLeft(pos - 200);
}
