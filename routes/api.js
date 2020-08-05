var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var addon = require('resources/cpp/bindings')('people-detector');
//var exec = require('child_process').exec;
//var api = require('./apiController');

const db = new sqlite3.Database('./resources/db/information.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
});


router.get('/admin/setting', function(req, res) {
  const query = `SELECT * FROM setting;`;
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

  const query1 = `insert into camera(ip, image) values ("${req.body.ip}", "${req.body.ip}_out.jpeg");`;
  const query2 = `select id, datetime('now', 'localtime', '+10 seconds') as date from camera  where ip = "${req.body.ip}";`;
  console.log(req);
  //const query = `insert into camera(ip, image) values ("hello", "hello_out.png");`;
  db.serialize(() => {
    // Queries scheduled here will be serialized.
    db.run(query1)
      .each(query2, (err, row) => {
        if (err) {
          throw err;
        }
        res.status(201).json({
          "cameraID": row.id,
          "originalDate": row.date
        });
      });
  });
});


router.get('/admin/roi-info', function(req, res) {
  const query = `select id, leftX, leftY, rightX, rightY from roi;`;
  db.all(query, (err, rows) => {
    console.log(rows);
    var data = [];
    rows.forEach(function(row) {
      data.push({
        "id": row.id,
        "leftX": row.leftX,
        "leftY": row.leftY,
        "rightX": row.rightX,
        "rightY": row.rightY,
      });
    });
    res.status(200).json(data);
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
  require("fs").writeFile("resources/images/original/" + filename, base64Data, 'base64', function(err) {
    console.log(err);
  });
  const query2 = `select datetime('${originalDate}', (select saveInterval || ' seconds' from setting)) as date;`;
  db.each(query2, (err, row) => {
    if (err) return res.json(err);
    res.status(201).json({
      "originalDate": row.date
    });
  });
/*
  var obj = new addon.Yolo_cpu();
  var people = obj.start("resources/images/original/" + filename, 416);
  console.log(people); // people number
  const query1 = `insert into cam_image (name, originalDate, cameraID, peopleCNT)
    values ("${originalDate}_${cameraID}.jpeg", "${originalDate}", ${cameraID}, ${people});`;
  db.each(query1, (err, row) => {
    if (err) return res.json(err);
    console.log('update success!!');
  });
*/
});

module.exports = router;
