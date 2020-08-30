var express  = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var setting_id = 1;

const db = new sqlite3.Database('./resources/db/information.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err);
    }
});

router.get('/reset', function(req, res){
  const query1 = `UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME = 'camera';`;
  const query2 = `UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME = 'cam_image';`;
  const query3 = `delete from camera;`;
  const query4 = `delete from roi;`;
  db.serialize();

  db.serialize(() => {
  db.run(query1)
    .run(query2)
    .run(query3);
    //.run(query4);
});

  res.redirect('/setting/first');
});

router.get('/first', function(req, res){
  const query = `select * from setting where id = ${setting_id};`;
  db.serialize();
  db.each(query, function(err, row){
    if(err) return res.json(err);
    res.render('admin/index', {data: row, data2: ""});
  });

});


router.get('/update', function (req, res, next) {
    const cam_query = `select * from camera where settingID = ${setting_id};`;
    const query2 = `select * from setting where id = ${setting_id};`;
    const roi_query = `select * from roi where settingID = ${setting_id} order by camID;`;

    db.serialize(() => {
      db.all(cam_query, (err, row1) => {
          if (err){throw err;}
          db.each(query2, function(err, row2){
            if(err) return res.json(err);
            db.all (roi_query, (err, row3) => {
              res.render('admin/index', {data: row2, data2: row1, data3: row3});
            });
          });
        });
    });
});

router.post('/update', function (req, res, next) {
  console.log(req.body);
    var {sizeW, sizeH, resizeW, resizeH, camNum, savePeriod, saveInterval, saveNum} = req.body;
    const query = `update setting
    set sizeW = ${sizeW}, sizeH = ${sizeH}, resizeW = ${resizeW}, resizeH = ${resizeH},
    camNum = ${camNum}, savePeriod = ${savePeriod}, saveInterval = ${saveInterval}, saveNum = ${saveNum}, regDate = datetime('now', 'localtime')
    where id = ${setting_id};`;
    const cam_query = `select * from camera where settingID = ${setting_id};`;
    const query2 = `select * from setting where id = ${setting_id};`;
    const roi_query = `select * from roi where settingID = ${setting_id} order by camID;`;

    db.serialize(() => {
      db.run(query)
        .all(cam_query, (err, row1) => {
          if (err){
            throw err;
          }
          db.each(query2, function(err, row2){
            if(err) return res.json(err);
            db.all (roi_query, (err, row3) => {
              res.render('admin/index', {data: row2, data2: row1, data3: row3});
            });
          });
        });
    });
});

router.post('/submit', function(req, res){
  const roi_setup = `delete from roi;`;

  db.run(roi_setup);
  if(req.body.data){
  db.parallelize(() => {
    if(req.body.data[0].length == 1){
      var arr = req.body.data.split(',');
      var query = `insert into roi(camID, leftX, leftY, width, height, settingID)
        values (${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[4]}, ${setting_id});`;
      db.get(query, (err, row) => {
        if (err) {
          console.error(err.message);
        }
      });
    }else{
      for(var i=0; i<req.body.data.length; i++){
        var arr = req.body.data[i].split(',');
        var query = `insert into roi(camID, leftX, leftY, width, height, settingID)
          values (${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[4]}, ${setting_id});`;
        db.get(query, (err, row) => {
          if (err) {
            console.error(err.message);
          }
        });
      }
    }
});
}
    res.redirect('/');
})

router.post('/refresh', function(req, res){

  const cam_query = `select * from camera where settingID = ${setting_id}`;

  db.serialize(() => {
    db.all(cam_query, (err, row1) => {
        if (err){
          throw err;
        }
        res.json({"data": row1});
      });
  });
})

module.exports = router;
