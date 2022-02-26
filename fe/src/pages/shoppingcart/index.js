import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ProductsData from "./component/ProductsData";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";
// -------- react icon --------
import { v4 as uuidv4 } from "uuid";
import { FaStore } from "react-icons/fa";

const Shoppingcart = () => {
  // 購物車資料
  const [shoppingCartData, setShoppingCartData] = useState([]);
  // 刪除商品刷新頁面開關
  const [deleteLive, setDeleteLive] = useState(true);
  // 總金額刷新開關
  const [priceTotal, setPriceTotal] = useState(true);
  useEffect(() => {
    let getShoppingData = async () => {
      // 撈 user_id 所存入購物車的資料
      let shoppingDataResponse = await axios.get(
        `${API_URL}/shop/shoppingstoredata/1`
      );
      setShoppingCartData(shoppingDataResponse.data);
    };
    getShoppingData();
  }, [deleteLive, priceTotal]);

  return (
    <div>
      <div className="container-fluid shopping-title">購物車</div>
      <div className="container user-shopping-cart  ">
        {shoppingCartData.length > 0 ? (
          shoppingCartData.map((item) => {
            return (
              <div
                className="col-9 mx-auto user-shopping-cart-data"
                key={item.store_id}
              >
                {/* 標頭 */}
                <div className="d-flex user-shopping-cart-data-title">
                  <div className="d-flex align-items-center">
                    <div>
                      <FaStore className="store-icon" />
                    </div>
                    <div className="user-shopping-cart-data-title-name">
                      {item.store_name}
                    </div>
                    <div className="user-shopping-cart-data-title-category">
                      {item.category}
                    </div>
                  </div>

                  <div className="user-shopping-cart-data-title-rwd user-shopping-cart-data-price">
                    單價
                  </div>
                  <div className="user-shopping-cart-data-title-rwd user-shopping-cart-data-amount">
                    數量
                  </div>
                  <div className="d-flex  user-shopping-cart-data-title-rwd">
                    <div className="mx-5 user-shopping-cart-data-title-rwd">
                      小記
                    </div>
                    <div className="user-shopping-cart-data-title-rwd">
                      刪除
                    </div>
                  </div>
                </div>
                {/* 商品資料 */}
                <ProductsData
                  storeid={item.store_id}
                  setDeleteLive={setDeleteLive}
                  deleteLive={deleteLive}
                  setPriceTotal={setPriceTotal}
                  priceTotal={priceTotal}
                />
                {/* 下排 */}
                <div className="d-flex justify-content-between   user-shopping-cart-data-payment ">
                  <div className="d-flex ">
                    <div>付款方式 : </div>
                    <div className="user-shopping-cart-data-payment-method">
                      <div className="site">
                        <input
                          type="radio"
                          id="huey"
                          name="drone"
                          value="huey"
                        />
                        <label for="huey">現場取貨付款</label>
                      </div>

                      <div className="credit-card">
                        <input
                          type="radio"
                          id="dewey"
                          name="drone"
                          value="dewey"
                        />
                        <label for="dewey">信用卡付款</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      訂單金額 :
                      <span className="price_total">NT${item.total}</span>
                    </div>
                  </div>
                </div>

                {/* 結帳 */}
                <div className="user-shopping-cart-data-checkout">
                  <button className="" onClick={() => {}}>
                    去結帳
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>可以加入沒商品時的畫面</div>
        )}
      </div>
    </div>
  );
};

export default Shoppingcart;
