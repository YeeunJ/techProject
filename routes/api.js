var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
//var addon = require('bindings')('../resources/cpp/build/Release/people-detector');

//여기서 많은게 바뀌어야 해요..ㅎ
//쿼리 다 바꿔서..!! setting id를 생각해줄 수 있게 만들기!!

var setting_id = 1;

const db = new sqlite3.Database('./resources/db/information.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
});


router.get('/admin/setting', function(req, res) {
  const query = `SELECT * FROM setting where id = ${setting_id};`;
  db.serialize();
  db.each(query, (err, row) => {
    res.status(200).json({
      "sizeW": row.sizeW,
      "sizeH": row.sizeH
    });
  });
});

router.post('/admin/roi-image', function(req, res) {
  //const ip = req.body.ip;
  //const image = req.file.originalname;

  var base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
  require("fs").writeFile("resources/images/conf/" + req.body.ip + "_out.jpeg", base64Data, 'base64', function(err) {
    console.log(err);
  });
  const begin = `BEGIN EXCLUSIVE TRANSACTION;`;
  const query1 = `insert into camera(camID, settingID, ip, image) values ((select count(*)+1 from camera where settingID = ${setting_id}), ${setting_id}, "${req.body.ip}", "${req.body.ip}_out.jpeg");`;
const query2 = `select count(*) as seq, datetime('now', 'localtime', '+10 seconds') as date from camera where settingID = ${setting_id};`;
  const end = `COMMIT TRANSACTION;`;

  db.serialize(() => {
    // Queries scheduled here will be serialized.
    db.run(begin)
      .run(query1)
      .each(query2, (err, row) => {
        if (err) {
          throw err;
        }
        console.log(row);
        res.status(201).json({
          "cameraID": row.seq,
          "originalDate": row.date
        });
        db.run(end);
      });
  });
});

router.post('/basic/image-info', function(req, res) {
  const {cameraID, originalDate, image} = req.body;
  var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  var filename = originalDate + "_"+cameraID+".jpeg";
  console.log(filename);
  filename = filename.replace(/ /gi, "");
  filename = filename.replace(/:/g,"");
  filename = filename.replace(/-/g,"");
  console.log(filename);

  const query2 = `select datetime('${originalDate}', (select '+' || saveInterval || ' seconds' from setting)) as date, sizeW, sizeH from setting where id = ${setting_id};`;
  const query3 = `select leftX, leftY, width, height from roi where camID = ${cameraID} and settingID = ${setting_id};`;
  db.each(query2, (err, row) => {
    if (err) return res.json(err);
    res.status(201).json({
      "originalDate": row.date,
      "sizeW": row.sizeW,
      "sizeH": row.sizeH,
    });
  });

  require("fs").writeFile("resources/images/original/" + filename, base64Data, 'base64', function(err) {
    if (err === null) {
      db.all(query3, (err, row) => {
          /*
              var obj = new addon.Yolo_cpu();
              if(row){
                var people = obj.start("resources/images/original/" + filename, "resources/images/result/" + filename, 416, {"data": row});
              }else{
                var people = obj.start("resources/images/original/" + filename, "resources/images/result/" + filename, 416);
              }
              */

              const query1 = `insert into cam_image (name, originalDate, cameraID, peopleCNT, settingID)
                values ("${originalDate}_${cameraID}.jpeg", "${originalDate}", ${cameraID}, ${people}, ${setting_id});`;
              db.each(query1, (err, row) => {
                if (err) return res.json(err);
              });
      });
    } else {
      console.log('fail');
    }
  });

});

module.exports = router;
