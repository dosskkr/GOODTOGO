// 引入 express
const express = require("express");
// 引入 express router
const router = express.Router();
const connection = require("../utils/db");
let moment = require("moment"); // require
moment().format(); 
router.post("/shoppingcartotoaldelete", async (req, res, next) => {
  // console.log(req.body);
  // TODO: 寫進資料庫
  let [result] = await connection.execute(
    `DELETE FROM shopping_cart WHERE id = ? `,
    [req.body.id]
  );
  // console.log(result);
  res.json({ msg: "刪除成功" });
});

router.post("/shoppingcartotoal", async (req, res, next) => {
  // console.log(req.body);
  // TODO: 寫進資料庫
  let [result] = await connection.execute(
    `UPDATE shopping_cart SET amount=? WHERE id = ?;`,
    [req.body.amount, req.body.id]
  );
  // console.log(result);
  res.json({ msg: "ok" });
});

// 使用者所加入購物車所有商品店家(不重複)
router.get("/shoppingstoredata/:userid", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `SELECT shopping_cart.store_id,stores.name AS store_name,products_category.category,SUM(shopping_cart.amount*products.price)AS total
FROM shopping_cart
JOIN products ON products.id=shopping_cart.products_id
JOIN stores ON shopping_cart.store_id = stores.id
JOIN products_category ON products_category.id=stores.stores_category_id
WHERE user_id =?
GROUP BY store_id`,
    [req.params.userid]
  );

  res.status(200).json(data);
});

// 使用者所加入購物車所有商品
router.get("/shoppingcar/:userId/:storeid", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `SELECT 
    a.*,
    b.name,
    c.category,
    d.name AS product_name,
    d.img,
    d.price,
    d.amount AS sale_amount
    FROM shopping_cart AS a 
    JOIN stores AS b ON b.id = a.store_id
    JOIN stores_category AS c ON c.id = b.stores_category_id
    JOIN products AS d ON a.products_id = d.id
    WHERE a.user_id = ? AND a.store_id = ?`,
    [req.params.userId, req.params.storeid]
  );

  res.status(200).json(data);
});

// 使用者所加入購物車所有商品
router.get("/shoppingcar/:userId/", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `SELECT 
    a.*,
    b.name,
    c.category,
    d.name AS product_name,
    d.img
    FROM shopping_cart AS a 
    JOIN stores AS b ON b.id = a.store_id
    JOIN stores_category AS c ON c.id = b.stores_category_id
     JOIN products AS d ON a.products_id = d.id
    WHERE user_id = ?`,
    [req.params.userId]
  );

  res.status(200).json(data);
});


// /api/shop/shoppingcar
router.post("/shoppingcar", async (req, res, next) => {
  //req.params 變數是在網址上
  //req.query ?xxx
  // body(form post) post用
  // console.log(req.body);
  // console.log(req.body.amount !== 0);
  if (req.body.products_id === "" || req.body.amount <= 0) {
    return res.status(400).json({ code: "30001", msg: "ok" });
  }

  let [result] = await connection.execute(
    "INSERT INTO shopping_cart (store_id,user_id,products_id,amount)VALUES(?,?,?,?)",
    [req.body.store_id, req.body.user_id, req.body.products_id, req.body.amount]
  );

  res.json({ msg: "加入購物車成功" });
});


// async function go(){
// let cccarr = [
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "~!",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
//   {
//     com: "",
//     star: Math.floor(Math.random() * 5 + 1),
//   },
// ];

// for (let a = 11; a <= 15; a++) {
//   for (let b = 13; b <= 18; b++) {
//     let aaa = moment("2022-02-01 05:00:00")
//       .add(a, "day")
//       .add(a, "h")
//       .add(a + 1, "m")
//       .add(a + 2, "s")
//       .format("YYYY-MM-DD hh:mm:ss");
//     console.log(
//       `用戶${a},評論商家1的商品id${b} 時間${aaa} 評論:${cccarr[a - 10].com} 星:${
//         cccarr[a - 10].star
//       }`
//     );

//     let [data, fields] = await connection.execute(
//       `INSERT INTO 
//     products_comment (user_id,products_id,store_id,comment,star,create_time)
//     VALUES(${a},${b},3,"${cccarr[a - 10].com}",${cccarr[a - 10].star},"${aaa}")`
//     );
//   }
// }

// }
// go()


// async function go1(){

// for (let a = 1; a <= 30; a++) {
//   for (let b = 1; b <= 76; b++) {
//     let [data, fields] = await connection.execute(
//       `INSERT INTO 
//     user_like (user_id,store_id)
//     VALUES(${a},${b})`
//     );
//     console.log(`會員${a} 按了${b}商家愛心`)
//   }
// }

// }
// go1()


module.exports = router;







