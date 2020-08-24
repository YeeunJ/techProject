var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
//var addon = require('bindings')('../resources/cpp/build/Release/people-detector');
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
  const query = `SELECT * FROM setting where id = 1;`;
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
  const query1 = `insert into camera(ip, image) values ( "${req.body.ip}", "${req.body.ip}_out.jpeg");`;
const query2 = `select seq, datetime('now', 'localtime', '+10 seconds') as date from sqlite_sequence where name = 'camera';`;
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
          "originalDate": row.seq,
          "originalDate": row.date
        });
        db.run(end);
      });
  });
});

/*
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
});*/

router.post('/basic/image-info', function(req, res) {
  const {cameraID, originalDate, image} = req.body;
  var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  var filename = originalDate + "_"+cameraID+".jpeg";
  console.log(filename);
  filename = filename.replace(/ /gi, "");
  filename = filename.replace(/:/g,"");
  filename = filename.replace(/-/g,"");
  console.log(filename);

  const query2 = `select datetime('${originalDate}', (select '+' || saveInterval || ' seconds' from setting)) as date, sizeW, sizeH from setting;`;
  //const query3 = `select leftX, leftY, rightX as width, rightY as height from roi where camID = ${cameraID};`;
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
        console.log({"data": row});
/*
              var obj = new addon.Yolo_cpu();
              var people = obj.start("resources/images/original/" + filename, "resources/images/result/" + filename, 416, {"data": row});
              console.log(people); // people number
*/
var people = 3;
              const query1 = `insert into cam_image (name, originalDate, cameraID, peopleCNT)
                values ("${originalDate}_${cameraID}.jpeg", "${originalDate}", ${cameraID}, ${people});`;
              db.each(query1, (err, row) => {
                if (err) return res.json(err);
                console.log('update success!!');
              });
      });
    } else {
      console.log('fail');
    }
  });

});

module.exports = router;
