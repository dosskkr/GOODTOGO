const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

// router.get("/", async (req, res, next) => {
//   let [data, fields] = await connection.execute("SELECT * FROM stores");
//   // console.log(data);
//   res.json(data);
// });

// router.get(":1", async (req, res, next) => {
//   let [data, fields] = await connection.execute(
//     "SELECT * FROM products_comment"
//   );
//   // console.log(data);
//   res.json(data);
// });

// -------- 撈出對應商家 ID 詳細資訊 --------
router.get("/:storeId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `SELECT * FROM products_comment WHERE store_id = ?  `,
    [req.params.storeId]
  );
  res.json(data);
});
// ------- 結束 --------

module.exports = router;
