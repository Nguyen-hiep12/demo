var express = require('express');
var router = express.Router();
var db = require('../models/database');

router.get('/spmoi/:sosp', (req, res) => {
  if (isNaN(req.params.sosp) == true) {
    res.json({ 'thongbao': 'sai kiểu tham số' });
    return;
  }
  let sosp = req.params.sosp;
  if (sosp <= 0) sosp = 10;
  let sql = `SELECT id, ten, gia, gia_km, ngay, xem, hinh FROM san_pham WHERE an_hien=1 ORDER BY ngay desc LIMIT 0, ${sosp}`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `Lỗi ${err}` });
    else res.json(data);
  });
})

router.get('/spxemnhieu/:sosp', (req, res) => {
  if (isNaN(req.params.sosp) == true) {
    res.json({ 'thongbao': 'sai kiểu tham số' });
    return;
  }
  let sosp = req.params.sosp;
  if (sosp <= 0) sosp = 10;
  let sql = `SELECT id, ten, gia, gia_km, ngay, xem, hinh FROM san_pham WHERE an_hien=1 ORDER BY xem desc LIMIT 0, ${sosp}`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `Lỗi ${err}` });
    else res.json(data);
  });
})

router.get('/sphot/:sosp', (req, res) => {
  if (isNaN(req.params.sosp) == true) {
    res.json({ 'thongbao': 'sai kiểu tham số' });
    return;
  }
  let sosp = req.params.sosp;
  if (sosp <= 0) sosp = 10;
  let sql = `SELECT id, ten, gia, gia_km, ngay, xem, hinh FROM san_pham WHERE an_hien=1 AND hot=1 ORDER BY ngay desc LIMIT 0, ${sosp}`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `Lỗi ${err}` });
    else res.json(data);
  });
})

router.get('/sp/:id', (req, res) => {
  let id = req.params.id;
  let sql = `
  SELECT id, id_nhasx, ten, gia, gia_km, hinh, ngay, xem, hot ,an_hien, tinh_chat, mau_sac, can_nang FROM san_pham WHERE id = ${id};
  SELECT ram, cpu, dia, man_hinh, thong_tin_pin, cong_nghe_man_hinh, cong_ket_noi FROM thuoc_tinh WHERE id_sp = ${id}`
  db.query(sql, (err, arr) => {
    if (err) throw err;
    let sp = arr[0][0];
    let tt = arr[1][0];
    var obj = Object.assign(sp, tt);
    res.json(obj)
  })
})

router.get('/list_nhasx/:id', (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM nha_sx WHERE id =${id}`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': 'Lỗi ' + err })
    else res.json(data);
  })
})

router.get('/list_nhasx', (req, res) => {
  let sql = `SELECT * FROM nha_sx`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': "Lỗi " + err })
    else res.json(data);
  })
})

router.post('/list_nhasx',(req, res)=>{
  let data = req.body;
  let sql = 'INSERT INTO nha_sx SET ?'
  db.query(sql, data, (err, d)=>{
      if (err) res.json({'Loi':err});
      else res.json({'thongbao':' Đã chèn xong san phẩm'});
  });
});

router.put('/list_nhasx/:id',(req, res)=>{
  let id = req.params.id;
  if (isNaN(id) == true){
      res.json({'thongbao':` khong có san pham ${id} để cap nhat`})
      return;
  }
  let data = req.body;
  let sql = 'UPDATE nha_sx SET ? WHERE id = ?';
  db.query(sql, [data,id ], (err, d)=>{
      if (err) res.json({'Loi':err});
      else res.json({'thongbao':' Đã cập nhật sản phẩm'});
  });
});

router.delete('/list_nhasx/:id',(req, res)=>{
  let id = req.params.id;
  let data = req.body;
  let sql = 'DELETE FROM nha_sx WHERE id = ?';
  db.query(sql, id , (err, d)=>{
      if (err) res.json({'Loi':err});
      else res.json({'thongbao':' Đã xóa thành công'});
  });
});
module.exports = router;


