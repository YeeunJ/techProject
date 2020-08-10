var express  = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./resources/db/information.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});

router.get('/reset', function(req, res){
  const query1 = `UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME = 'camera';`;
  const query2 = `UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME = 'cam_image';`;
  const query3 = `delete from camera;`;
  const query4 = `delete from roi;`;
  console.log(req);
  db.serialize();

  db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run(query1)
    .run(query2)
    .run(query3)
    .run(query4);
});

  res.redirect('/setting/first');
});

router.get('/first', function(req, res){
  const query = `select * from setting where id = 1;`;
  console.log(req);
  db.serialize();
  db.each(query, function(err, row){
    if(err) return res.json(err);
    res.render('admin/index', {data: row, data2: ""});
    console.log(row);
  });

});
/*update에서 cam_query를 camNum이랑 같이 join!!! left join써보자!!*/
router.get('/update', function (req, res, next) {
    const cam_query = `select * from camera limit 2;`;
    const query2 = `select * from setting where id = 1;`;

    db.serialize(() => {
      db.all(cam_query, (err, row1) => {
          if (err){
            throw err;
          }
          db.each(query2, function(err, row){
            if(err) return res.json(err);
            res.render('admin/index', {data: row, data2: row1});
            console.log(row1);
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
    where id = 1;`;
    const cam_query = `select * from camera limit 2;`;
    const query2 = `select * from setting where id = 1;`;
    console.log(query);
    console.log(cam_query);

    db.serialize(() => {
      // Queries scheduled here will be serialized.
      db.run(query)
        .all(cam_query, (err, row1) => {
          if (err){
            throw err;
          }
          db.each(query2, function(err, row){
            if(err) return res.json(err);
            res.render('admin/index', {data: row, data2: row1});
            console.log(row1);
          });
        });
    });
    /*db.each(query, (err, row) => {
        if(err) return res.json(err);
    });*/
});

router.post('/submit', function(req, res){
  console.log("submit");
  console.log(req.body.data);
  db.parallelize(() => {
    for(var i=0; i<req.body.count; i++){
      var arr = req.body.data[i].split(',');
      var query = `insert into roi(camID, leftX, leftY, rightX, rightY)
        values (${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[4]});`;
      db.get(query, (err, row) => {
        if (err) {
          console.error(err.message);
        }
      });
    }
});
    res.redirect('/');
})

router.post('/refresh', function(req, res){

  const cam_query = `select * from camera`;

  db.serialize(() => {
    db.all(cam_query, (err, row1) => {
        if (err){
          throw err;
        }
        res.json({"data": row1});
        console.log(row1);
      });
  });
  // 서버에서는 JSON.stringify 필요없음
})

module.exports = router;
