const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");

// --------- 撈出全部商品 --------
// /api/products
router.get("/", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM products");
  // console.log(data);
  res.json(data);

        })
// -------- 撈出全部商品結束 --------

//localhost:3002/api/products/storelike/
http: router.get("/storelike/:storeId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT COUNT(*) AS storeLikeTotal FROM `user_like` WHERE store_id = ?",
    [req.params.storeId]
  );
  res.json(data);
});
// -------- 撈出全部商品結束 --------



// -------- 撈出對應商家 ID 商品 --------
router.get("/:storeId", async (req, res, next) => {
  // 撈出指定商家 id 的 商品
  let [products, fields] = await connection.execute(
    `SELECT * FROM products WHERE store_id = ?;`,
    [req.params.storeId]
  );
  
  
  //取出 id 得出
  let productIds = products.map((d) => {

    return d.id;
  });

 
  let [comments] = await connection.execute(
    `SELECT 
    count(id) AS count , 
    products_id, 
    round(AVG(star),1) AS score 
    FROM products_comment 
    WHERE products_id IN (${productIds.join(",")}) 
    GROUP BY products_id;`
  );

  // 取出 id總數
  // 來自commit表
  // 取出 id 是 123456
  // 將 products_id 是同個值的寫再一起
  
  // res.json(comments);
  products.map((p) => {
    let comment = comments.find((c) => c.products_id === p.id);
    
    if (comment) {
      p.count = comment.count
      p.score = comment.score;
    } else {
      p.score = null;
    }
  });

  res.json(products);
});





// 撈出商品清單點擊編輯時所選 id
router.get("/productsdifferent/:productId", async (req, res, next) => {
  // let [data, fields] = await connection.execute(
  //   "SELECT COUNT(*) AS total FROM products WHERE store_id = ? "
  // );
  // console.log(data);
  // res.json(data);
  // req.params.storeId
  //取出網址上的 stockId 確認
  // console.log(req.params.storeId);
  //撈資料
  let [data, fields] = await connection.execute(
    "SELECT * FROM products WHERE id = ?",
    [req.params.productId]
  );
  res.json(data);
});



module.exports = router;
