var db = require('../models/database');
var express = require('express');
var router = express.Router();




router.get('/list_nhasx', (req, res) => {
    let sql = `SELECT * FROM nha_sx `;
    db.query(sql, (err, data) => {
      if (err) res.json({ 'thongbao': "Lỗi " + err })
      else res.json(data);
    })
  })
router.get('/',(req, res)=>{
    let limit = ``;
    if (req.query._limit!=undefined && isNaN(req.query._limit)== false){
        let sosp = Number(req.query._limit);
        if(sosp <=0 ) sosp =10;
        limit = `LIMIT 0 , ${sosp}`;
    }
    let sort= ``;
    if (req.query._sort!=undefined){
        let str = req.query._sort;
        sort = `ORDER BY ${str} asc`;
    }

    let sql = `SELECT id, ten_sp, gia,hinh
    FROM san_pham ${sort} ${limit}`;
    db.query(sql, (err, arr) => {
       if (err) res.json({'thongbao': `Loi thuc thi mysql ${err}`}) ;
       else res.json(arr);
    });
})

router.get('/:id',(req, res)=>{
    let id = req.params.id;
    if (isNaN(id) == true){
        res.json({'thongbao':`San pham ${id} khong ton tai`})
        return;
    }
    let sql = `SELECT id, ten_sp, gia, hinh FROM san_pham WHERE id = ${id}`
    db.query(sql, id, (err, arr)=>{
        if (err) res.json({'Loi':err});
        else if (arr.length==0) res.json({'thongbao':` sản phẩm ${id} không tồn tại`});
        else res.json(arr[0]);
    });
})

router.post('/',(req, res)=>{
    let data = req.body;
    let sql = 'INSERT INTO san_pham SET ?'
    db.query(sql, data, (err, d)=>{
        if (err) res.json({'Loi':err});
        else res.json({'thongbao':' Đã chèn xong san phẩm'});
    });
});

router.put('/:id',(req, res)=>{
    let id = req.params.id;
    if (isNaN(id) == true){
        res.json({'thongbao':` khong có san pham ${id} để cap nhat`})
        return;
    }
    let data = req.body;
    let sql = 'UPDATE san_pham SET ? WHERE id = ?';
    db.query(sql, [data,id ], (err, d)=>{
        if (err) res.json({'Loi':err});
        else res.json({'thongbao':' Đã cập nhật sản phẩm'});
    });
});

router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    let data = req.body;
    let sql = 'DELETE FROM san_pham WHERE id = ?';
    db.query(sql, id , (err, d)=>{
        if (err) res.json({'Loi':err});
        else res.json({'thongbao':' Đã xóa thành công'});
    });
});

module.exports = router;