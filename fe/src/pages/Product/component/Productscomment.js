import { FiMoreVertical } from "react-icons/fi";
import { useState, useEffect } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { AiOutlineConsoleSql } from "react-icons/ai";
// -------- 商品評論 --------
const StoreProductsComment = () => {
  const { storeId } = useParams();
  const { currentPage } = useParams();

  // 存指定商家 ID 評論
  const [productsComment, setproductsComment] = useState([]);
  // 存總筆數
  const [totalPages, setTotalPages] = useState([]);
  // 評分留言切換開關
  const [productsCommitStarSortSwitch, setproductsCommitStarSortSwitch] =
    useState("");
  // 時間排序切換開關
  const [productsCommitTimeSortSwitch, setproductsCommitTimeSortSwitch] =
    useState("");
  // 總頁數預設 1
  const [lastPage, SetLastPage] = useState(1);
  const [page, setPage] = useState(parseInt(currentPage, 10) || parseInt(1));

  // 撈指定商家評論
  useEffect(() => {
    let getComment = async () => {
      // 預設 create_time DESC API
      let productsCommentResponse = await axios.get(
        `${API_URL}/productscommit/${storeId}?page=${page}`
      );
      //評價 DESC API
      let productsCommentStarDescResponse = await axios.get(
        `${API_URL}/productscommentstardesc/${storeId}?page=${page}`
      );
      // 評價 ASC API
      let productsCommentStarAscResponse = await axios.get(
        `${API_URL}/productscommentstarasc/${storeId}?page=${page}`
      );
      // create_time ASC API
      let productsCommentTimeAscResponse = await axios.get(
        `${API_URL}/productscommenttimeasc/${storeId}?page=${page}`
      );
      setproductsComment(productsCommentResponse.data.data);
      setTotalPages(productsCommentResponse.data.pagination.total);
      SetLastPage(productsCommentResponse.data.pagination.lastPage);

      if (productsCommitTimeSortSwitch === false) {
        setproductsComment(productsCommentResponse.data.data);
        
      } else if (productsCommitStarSortSwitch === true) {
        setproductsComment(productsCommentStarDescResponse.data.data);
        console.log("aaaaaaaaaaaaa",productsCommitStarSortSwitch);

      } else if (productsCommitStarSortSwitch === false) {
        setproductsComment(productsCommentStarAscResponse.data.data);

      } else if (productsCommitTimeSortSwitch === true) {
        setproductsComment(productsCommentTimeAscResponse.data.data);
   
      }
    };
    getComment();
  }, [page, productsCommitTimeSortSwitch, productsCommitStarSortSwitch]);

  // productsComment.map((item) => {
  //   console.log(item.name, item.star ,item.create_time);

  // });

  //! 如果time是空值,star排序會失效
  console.log("star", productsCommitStarSortSwitch);
  console.log("time", productsCommitTimeSortSwitch);

  function handleStarSort() {
    setproductsCommitStarSortSwitch(!productsCommitStarSortSwitch);
  }

  function handleTimeSort() {
    setproductsCommitTimeSortSwitch(!productsCommitTimeSortSwitch);
  }

  // 計算頁碼
  let navigate = useNavigate();
  let pages = [];
  for (let i = 1; i <= lastPage; i++) {
    pages.push(
      <a
        href="#mark-1"
        className={`pages ${page === i ? "active" : ""}`}
        key={i}
        onClick={(e) => {
          setPage(i);
          navigate(`/store/1/${i}`);
        }}
      >
        {i}
      </a>
    );
  }

  // console.log("pagepagepagepage", typeof page, page);

  // let navigate = useNavigate();

  return (
    <div>
      <div className="container products-comment">
        <div>
          <div className="d-flex  justify-content-between text-end products-comment-total">
            <div className="d-flex product-users-comment-filter">
              <div className="me-2 product-users-comment-filter-star">
                評分
                <button
                  className="product-users-comment-filter-icon"
                  onClick={handleStarSort}
                >
                  <RiArrowUpDownFill />
                </button>
              </div>
              <div className="product-users-comment-filter-time">
                留言時間
                <button
                  className="product-users-comment-filter-icon"
                  onClick={handleTimeSort}
                >
                  <RiArrowUpDownFill />
                </button>
              </div>
            </div>
            <div>共 {totalPages} 則留言</div>
          </div>
        </div>
        {productsComment.map((item) => {
          return (
            <div className="col-12 mt-3 product-comment" key={item.id}>
              <div className="d-flex justify-content-between ">
                <div className="d-flex user-data w-100">
                  <div>
                    <div className="user-photo mt-3">
                      <img
                        className="cover-photo"
                        src={require(`../../../images/store_img/01.jpg`)}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="ms-4 w-100">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <div className="pt-2 user-data-name">{item.name}</div>
                      <div className="d-flex align-items-center">
                        <div className="user-data-comment-time">
                          {/* 2021-12-12 10 : 10 PM */}
                          {item.create_time}
                        </div>
                        <div className="">
                          <button
                            className=" user-data-report"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FiMoreVertical />
                          </button>
                          <ul className="dropdown-menu">
                            <a href="">檢舉</a>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between  product-data">
                      <div>
                        <div className="d-flex ">
                          <div className="">
                            <div className="d-flex ">
                              {/* // ! 評價無法正常顯示 星數與資料對不上 */}

                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={item.star}
                                  precision={0.1}
                                  readOnly
                                />
                              </Stack>

                              <div className="ps-2 product-data-name">
                                {item.products_name}
                              </div>
                            </div>
                          </div>
                          <div className="ps-3 product-data-name">
                            {item.products}
                          </div>
                        </div>
                        <p className="pt-2 mb-0 user-comment">{item.comment}</p>
                      </div>
                      <img
                        className="product-photo "
                        src={require(`../../../images/products_img/${item.img}`)}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <div className="d-flex">
                    <div className="d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* // 頁碼功能 */}
        {/* // ! Link尚未設定錨點 */}
        <div className="products-comment-pagination">
          <div className="pages-icon">
            {page <= 1 ? (
              <Link
                to={`${page}#mark-1`}
                className="comment-page-arrow page-opcity"
                onClick={() => {
                  setPage(page);
                }}
              >
                <FiChevronLeft />
              </Link>
            ) : (
              <Link
                to={`${page - 1}#mark-1`}
                className="comment-page-arrow"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <FiChevronLeft />
              </Link>
            )}
          </div>
          <div>
            {pages.map((item) => {
              return item;
            })}
          </div>
          <div className="pages-icon">
            {page >= lastPage ? (
              <Link
                to={`${page}`}
                className="comment-page-arrow page-opcity"
                onClick={() => {
                  setPage(page);
                }}
              ></Link>
            ) : (
              <Link
                to={`${page + 1}`}
                className="comment-page-arrow"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <FiChevronRight />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductsComment;
