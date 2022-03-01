import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/auth";
import { FiHeart } from "react-icons/fi";

//UI套件
import { Rating } from "@mui/material";
import { AiOutlineClockCircle } from "react-icons/ai";
//uuid->key
import { v4 as uuidv4 } from "uuid";
import "moment/min/locales";
//後端套件
import axios from "axios";
import { API_URL } from "../../../../utils/config";
const moment = require("moment");

const RecomCard = (props) => {
  moment.locale("zh-tw");
  const [displayList, setDisplayList] = useState([]);
  const [commentCount, setCommentCount] = useState([]);
  const { totalHeart, productAmount } = props;
  const { loginMember, setLoginMember } = useAuth();

  useEffect(() => {
    let getRecomm = async () => {
      let recommRes = await axios.get(`${API_URL}/storeRecommRouter`);

      let recommStores = recommRes.data[0];
      setDisplayList(recommStores);
      setCommentCount();
      // 計算指定商品的評論平均分數
      let productstarTotal = 0;
      // productModalCommentData.forEach((item) => {
      //   productstarTotal += item.star;
      // });
      // let productstarTotalAVG = (
      //   productstarTotal / productModalCommentData.length
      // ).toFixed(1);
    };
    getRecomm();
  }, []);
  // console.log(displayList);
  return (
    <>
      {displayList.map((item) => {
        // -------- 取得該店家愛心總數量 --------
        let likeCount = Object.values(totalHeart)[item.id - 1];
        // -------- 取得該店家產品總數量 --------
        let productCount = Object.values(productAmount)[item.id - 1];
        // -------- 處理沒有分店名的空白欄位 --------
        let space = "";
        {
          /* console.log(item.name); */
        }
        for (let i = 1; i < item.name.length; i++) {
          {
            /* console.log(item.name[i]); */
          }
          item.name[i] === " " && (space = true);
        }
        {
          /* console.log(space); */
        }
        // -------- 處理評分星星 --------

        return (
          <div key={item.id}>
            <Link to={`all/${item.id}`} className="no-link">
              <div className="store-rec-card shadow d-flex align-items-center col-lg-3 col-10">
                <div className="info-img col-12">
                  <img
                    src={require(`../../../../images/store_img/${item.logo}`)}
                    alt="logo"
                  />
                  <div
                    className={`${
                      item.opState === false ? "is-closed" : "is-open"
                    }`}
                  >
                    {item.opState === false ? "休息中" : "營業中"}
                  </div>
                </div>
                <div className="info-title mt-3 d-flex justify-content-between col-12">
                  <span className="text-dark-grey input-label-title">
                    {item.name.split(" ")[0]}
                    <br />
                    <span className="text-dark-grey detail-sm">
                      {space === true ? item.name.split(" ")[1] : <br />}
                      {/* 開發中才開啟  {item.close_day}*/}
                      {item.close_day}
                    </span>
                  </span>

                  <div className="cate-tag">{item.category}</div>
                </div>
                <div className="info-detail col-12 text-dark-grey detail-sm d-flex align-items-center justify-content-between flex-wrap mt-2">
                  <div className="d-flex align-items-center">
                    <AiOutlineClockCircle className="me-1" /> {item.open_time} -
                    {item.close_time}
                  </div>
                  <span className="text-dark-grey">
                    剩餘餐點：{productCount}
                  </span>
                  <hr className="col-12 mt-2 mb-2" />
                  <Rating name="read-only" value={1} readOnly />

                  {/* //*愛心:有登入顯示愛心框可以收藏; 沒登入就只能看到實體愛心 */}
                  <div className="d-flex align-items-center">
                    {loginMember !== null ? (
                      <>
                        <FiHeart
                          role="button"
                          className="store_Like_unActive"
                          onClick={(e) => {}}
                        />
                        <div className="ms-2">
                          {likeCount > 0 ? likeCount : 0}
                        </div>
                      </>
                    ) : (
                      <>
                        <FiHeart
                          className="store_Like_Active_view"
                          onClick={(e) => {}}
                        />
                        <div className="ms-2">
                          {likeCount > 0 ? likeCount : 0}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default RecomCard;
