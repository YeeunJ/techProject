$('#edit_camera').click(function(){
  $("#confirm_camera").css("display","inline-block");
  $("#cancle_camera").css("display","inline-block");
  $("#edit_camera").css("display","none");
  $("#edit_image").css("display","none");
  $("#edit_company").css("display","none");

  $("#sizeW").attr("readonly", false);
  $("#sizeH").attr("readonly", false);
  $("#resizeW").attr("readonly", false);
  $("#resizeH").attr("readonly", false);
  $("#camNum").attr("readonly", false);
  $("#sizeW").css("color", "white");
  $("#sizeH").css("color", "white");
  $("#resizeW").css("color", "white");
  $("#resizeH").css("color", "white");
  $("#camNum").css("color", "white");
});

$('#edit_image').click(function(){
  $("#confirm_image").css("display","inline-block");
  $("#cancle_image").css("display","inline-block");
  $("#edit_camera").css("display","none");
  $("#edit_image").css("display","none");
  $("#edit_company").css("display","none");

  $("#saveNum").attr("readonly", false);
  $("#savePeriod").attr("readonly", false);
  $("#saveInterval").attr("readonly", false);
  $("#saveNum").css("color", "white");
  $("#savePeriod").css("color", "white");
  $("#saveInterval").css("color", "white");
});

$('#edit_company').click(function(){
  $("#confirm_company").css("display","inline-block");
  $("#cancle_company").css("display","inline-block");
  $("#edit_camera").css("display","none");
  $("#edit_image").css("display","none");
  $("#edit_company").css("display","none");

  $("#companyName").attr("readonly", false);
  $("#phone").attr("readonly", false);
  $("#location").attr("readonly", false);
  $("#companyName").css("color", "white");
  $("#phone").css("color", "white");
  $("#location").css("color", "white");
});

$('#cancle_company').click(function(){
  $(location).attr('href', './update');
});
$('#cancle_camera').click(function(){
  $(location).attr('href', './update');
});
$('#cancle_image').click(function(){
  $(location).attr('href', './update');
});
