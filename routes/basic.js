var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./resources/db/information.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
});


router.get('/', function(req, res) {
  const query1 = `select * from setting where id = 1;`;
  const query2 = `select * from cam_image where peopleCNT is not null order by cameraID, originalDate;`;
  const query3 = `select cameraID, substr(originalDate, 1, 10) as date, sum(peopleCNT) as people from cam_image where peopleCNT is not null and strftime('%j', originalDate) > strftime('%j', datetime('now', 'localtime'), '-7 days') GROUP BY strftime('%j', originalDate), cameraID order by cameraID, date;`;
  const query4 = `select cameraID, substr(originalDate, 1, 16) as date, sum(peopleCNT) as people from cam_image where peopleCNT is not null and strftime('%j', originalDate) > strftime('%j', datetime('now', 'localtime'), '-1 days') GROUP BY strftime('%H', originalDate), cameraID order by cameraID, date;`;
  const query5 = `select cameraID, substr(originalDate, 1, 16) as date, count(*) as count, avg(peopleCNT) as people from cam_image where peopleCNT is not null and strftime('%H', originalDate) >= strftime('%H', datetime('now', 'localtime'), '-1 hours') and strftime('%j', originalDate) > strftime('%j', datetime('now', 'localtime'), '-1 days') GROUP BY strftime('%M', originalDate), cameraID order by cameraID, date;`;
  const query6 = `select * from cam_image where peopleCNT is not null and originalDate = (SELECT max(originalDate) from cam_image where peopleCNT is not null);`;
  console.log(query2);
  console.log(query3);
  console.log(query4);
  console.log(query5);
  db.parallelize(() => {
    db.each(query1, (err, rows1) => {
      db.all(query2, (err, rows2) => {
        db.all(query3, (err, rows3) => {
          db.all(query4, (err, rows4) => {
            db.all(query5, (err, rows5) => {
              db.all(query6, (err, rows6) => {
                console.log(rows1.id);
                console.log(rows1);
                console.log(rows2);
                console.log(rows3);
                console.log(rows4);
                console.log(rows5);
                console.log(rows6);
                res.render('basic/index', {
                  data1: rows1,
                  data2: rows2,
                  data3: rows3,
                  data4: rows4,
                  data5: rows5,
                  data6: rows6
                });
              });
            });
          });
        });
      });
    });

  });
});

router.post('/search', function(req, res) {
      const {starttime, endtime} = req.body;

      const query1 = `select * from setting where id = 1;`;
      const query2 = `select * from cam_image where originalDate between '${starttime}' and '${endtime}';`;
      const query3 = `select cameraID, substr(originalDate, 1, 10) as date, sum(peopleCNT) as people from cam_image where originalDate between '${starttime}' and '${endtime}' GROUP BY strftime('%j', originalDate), cameraID;`;
      console.log(query2);
      console.log(query3);
      db.each(query1, (err, rows1) => {
        db.all(query2, (err, rows2) => {
          db.all(query3, (err, rows3) => {
              res.json({"data1": rows1, "data2": rows2, "data3": rows3});
          });
        });
      });
});
      module.exports = router;
