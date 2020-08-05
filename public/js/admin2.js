document.querySelector('#confirm1').addEventListener('click', function(){
    // 입력값 위치를 찾아 변수에 담고
    var sizeW= document.forms[0].elements[0].value;
    var sizeH= document.forms[0].elements[1].value;
    var resizeW = document.forms[0].elements[2].value;
    var resizeH = document.forms[0].elements[3].value;
    var camNum = document.forms[0].elements[4].value;
    var savePeriod = document.forms[0].elements[5].value;
    var saveInterval = document.forms[0].elements[6].value;
    var saveNum = document.forms[0].elements[7].value;
    var inputdata = {
      sizeW: sizeW,
      sizeH: sizeH,
      resizeW: resizeW,
      resizeH: resizeH,
      camNum: camNum,
      savePeriod: savePeriod,
      saveInterval: saveInterval,
      saveNum: saveNum
    };
    console.log(inputdata);
    sendAjax('http://localhost:3000/setting1', inputdata)
});
//document.getElementById('adminROI').style.display = 'none';
function sendAjax(url, data){
  // 입력값을 변수에 담고 문자열 형태로 변환
  data = JSON.stringify(data);

  // content-type을 설정하고 데이터 송신
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', "application/json");
  xhr.send(data);

  // 데이터 수신이 완료되면 표시
  xhr.addEventListener('load', function(){
    // 문자열 형식으로 변환
    var result = JSON.parse(xhr.responseText);
    document.getElementById('adminROI').style.display = 'block';
    console.log(result);
    document.getElementById('script').innerHTML = "<script defer>";
    for(var i=1; i<= result.length; i++){
      document.getElementById('script').innerHTML += " document.getElementById('image"+i+"').onload = function() { new Cropper(this, { update: function(coordinates) {";
      document.getElementById('script').innerHTML += "document.getElementById('x"+i+"').value = this.coordinates.x; document.getElementById('y"+i+"').value = this.coordinates.y;";
      document.getElementById('script').innerHTML += "document.getElementById('width"+i+"').value = this.coordinates.width; document.getElementById('height"+i+"').value = this.coordinates.height;}});}";
    }
    document.getElementById('script').innerHTML += "</script>";
    document.getElementById('roiTab').innerHTML = "";
    document.getElementById('roiImage').innerHTML = '';
    document.getElementById('roi-form').innerHTML = '';
    for(var i=1; i<= result.length; i++){
      document.getElementById('roiTab').innerHTML += "<div class='roiCam' id='cam"+i+"'>CAMERA "+i+"</div><br/>";
      document.getElementById('roiImage').innerHTML += '<div id="camera1'+i+'"><img src="./config/images/'+result[i-1].image+'" id="image'+i+'" class = "image"/></div>';
      document.getElementById('roi-form').innerHTML += '<input type="text" name="x'+i+'" id="x'+i+'" value="0"> <input type="text" name="y'+i+'" id="y'+i+'" value="0"> <input type="text" name="w'+i+'" id="w'+i+'" value="0"> <input type="text" name="h'+i+'" id="h'+i+'" value="0">';
      console.log(result[i-1].image);
      new Cropper(document.getElementById("image"+i), {
        update: function(coordinates) {
          document.getElementById('x' + i).value = this.coordinates.x;
          document.getElementById('y'+i).value = this.coordinates.y;
          document.getElementById('width'+i).value = this.coordinates.width;
          document.getElementById('height'+i).value = this.coordinates.height;
        }
      });
    }
    document.getElementById('adminROI').style.display = 'block';
  });
}

var id = "";
/*
document.getElementById('image1').onload = function() {
  new Cropper(this, {
    update: function(coordinates) {
      // your code here!
      document.getElementById('x').value = this.coordinates.x;
      document.getElementById('y').value = this.coordinates.y;
      document.getElementById('width').value = this.coordinates.width;
      document.getElementById('height').value = this.coordinates.height;
    }
  });
}
document.getElementById('image2').onload = function() {
  new Cropper(this, {
    update: function(coordinates) {
      // your code here!
      document.getElementById('x2').value = this.coordinates.x;
      document.getElementById('y2').value = this.coordinates.y;
      document.getElementById('width2').value = this.coordinates.width;
      document.getElementById('height2').value = this.coordinates.height;
    }
  });
  document.getElementById('cam1').click();
}
*/
document.getElementById('cam1').addEventListener('click', function() {
  document.getElementById('camera2').style.display = 'none';
  document.getElementById('camera1').style.display = 'block';
});
document.getElementById('cam2').addEventListener('click', function() {
  document.getElementById('camera1').style.display = 'none';
  document.getElementById('camera2').style.display = 'block';
});

document.getElementById('submit').addEventListener('click', function() {
  location.href = "localhost:80/submit";
});
