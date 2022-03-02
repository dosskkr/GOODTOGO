import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, IMAGE_URL } from "../../../utils/config";
import { BsShop } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { useParams } from "react-router";

const UserOrderFinish = () => {
  const { status } = useParams();
  const [orderFinish, setOrderFinish] = useState([]);
  // 載入 使用者收藏店家清單
  useEffect(() => {
    // http://localhost:3002/api/member/order/status=2
    let getOrderFinish = async () => {
      // console.log(status)
      let response = await axios.get(`${API_URL}/member/order/${status}`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      console.log(
        "api/member/order/status=2(get) response.data: ",
        response.data
      );
      setOrderFinish(response.data);
    };
    getOrderFinish();
  }, []);

  return (
    <>
      {orderFinish.map((item) => {
        return (
          <div key={item.id} className="card order_List mb-3">
            <div className="d-flex flex-column-reverse flex-xl-row align-items-xl-center justify-content-xl-between text-nowrap">
              <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                <div className="d-flex">
                  <BsShop className="store_Icon" />
                </div>
                <span className="ms-3 ls-md">{item.store_name}</span>
                <div className="store_Category rounded-pill ms-4">
                  {item.store_category}
                </div>
              </div>
              <div className="d-flex justify-content-lg-between align-items-center flex-column-reverse flex-sm-row order_Status_Info mb-4 mb-xl-0">
                <div className="d-flex flex-grow-1">
                  <div className={item.status === "待領取" ? "c-d-yellow" : ""}>
                    訂單編號:
                  </div>
                  <span
                    className={
                      item.status === "待領取" ? "ms-2 c-d-yellow" : "ms-2"
                    }
                  >
                    {item.order_number}
                  </span>
                </div>
                <div className="c-l-grey d-none d-sm-block d-lg-none d-xl-block space">
                  |
                </div>
                <div className="d-flex align-items-center mb-3 mb-sm-0">
                  <div
                    className={
                      item.status === "待領取"
                        ? "c-d-yellow"
                        : item.status === "完成"
                        ? "c-green"
                        : "m-0"
                    }
                  >
                    {item.status}
                  </div>
                  {item.status === "待領取" ? (
                    <div className="order_Status_Button order_cancel">
                      取消訂單
                    </div>
                  ) : item.status === "完成" ? (
                    <div className="order_Status_Button order_finish d-flex align-items-center justify-content-between">
                      <span className="d-flex">
                        <FiMessageCircle className="comment_Icon me-1" />
                      </span>
                      <span>留言評價</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <hr className="my-4"></hr>
            {/* -------- 訂單細項 開始 -------- */}
            {item.details.map((detail) => {
              return (
                <div key={detail.product_id}>
                  <div className="d-flex justify-content-between align-items-center ls-md text-nowrap">
                    <div className="order_Store_Img">
                      <img
                        src={IMAGE_URL + detail.img}
                        className="cover-fit"
                        alt="storeImage"
                      />
                    </div>
                    <div className="flex-grow-1 ms-4">
                      <div className="py-1">{detail.product_name}</div>
                      <div className="py-1">$ {detail.price}</div>
                    </div>
                    <div className="d-flex align-self-end align-self-sm-center align-items-center justify-content-between order_Amount">
                      <div>x {detail.amount}</div>
                      <div>$ {detail.price * detail.amount}</div>
                    </div>
                  </div>
                  <hr className="my-4"></hr>
                </div>
              );
            })}

            {/* -------- 訂單細項 結束 -------- */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-1">
              <span className="flex-grow-1 fz-sm c-grey ls-md mb-2 mb-sm-0">
                訂單時間: {item.order_time}
              </span>
              <div className="d-flex align-items-center">
                <div className="me-2 fz-sm ls-md">訂單金額:</div>
                <div className="ms-3 order_Amount_Total">
                  NT$ {item.totalAmount}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default UserOrderFinish;
